import { FiltersResponse } from '@/types/Filters';
import { ApiResponse, Flat } from '@/types/Flats';
import { GetStaticProps, NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import RangeSlider from '@/components/RangeSlider';
import { numberWithSpaces } from '@/utils/numberWithSpaces';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

interface HomePageProps {
  apiResponse: ApiResponse;
  filtersResponse: FiltersResponse;
}

export const getStaticProps: GetStaticProps = async () => {
  const flatsResponse = await fetch('http://localhost:8083/api/v1/flats?per_page=9&page=1');
  const flatsData: { data: Flat[] } = await flatsResponse.json();

  const filtersResponse = await fetch('http://localhost:8083/api/v1/filters');
  const filtersData: FiltersResponse = await filtersResponse.json();

  if (!flatsData || !filtersData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      apiResponse: flatsData,
      filtersResponse: filtersData,
    },
  };
};

const HomePage: NextPage<HomePageProps> = ({ apiResponse, filtersResponse }) => {
  const router = useRouter();
  const [flats, setFlats] = useState<Flat[]>(apiResponse.data);
  const [currentPage, setCurrentPage] = useState<number>(apiResponse.meta.current_page);
  const [lastPage, setLastPage] = useState<number>(apiResponse.meta.last_page);
  const [totalFlats, setTotalFlats] = useState<number>(apiResponse.meta.total);
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState(filtersResponse.data.projects);
  const [rooms, setRooms] = useState(filtersResponse.data.rooms);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({
    min: filtersResponse.data.price.min_range,
    max: filtersResponse.data.price.max_range,
  });
  const [squareRange, setSquareRange] = useState<{ min: number, max: number }>({
    min: filtersResponse.data.square.min_range,
    max: filtersResponse.data.square.max_range,
  });

  const fetchFilteredFlats = useCallback(
    debounce(async () => {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (selectedProject) queryParams.append('f[projects][]', selectedProject.toString());
      if (selectedRoom !== null) queryParams.append('f[rooms][]', selectedRoom.toString());

      queryParams.append('f[price][min]', priceRange.min.toString());
      queryParams.append('f[price][max]', priceRange.max.toString());
      queryParams.append('f[square][min]', squareRange.min.toString());
      queryParams.append('f[square][max]', squareRange.max.toString());
      queryParams.append('per_page', '9');
      queryParams.append('page', '1');

      try {
        const response = await fetch(`http://localhost:8083/api/v1/flats?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: ApiResponse = await response.json();
        setFlats(data.data);
        setCurrentPage(1);
        setLastPage(data.meta.last_page);
        setTotalFlats(data.meta.total);
        router.push(`?${queryParams.toString()}`, undefined, { shallow: true });
      } catch (error) {
        console.error('Failed:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    [selectedProject, selectedRoom, priceRange, squareRange],
  );

  useEffect(() => {
    fetchFilteredFlats();
    return () => {
      fetchFilteredFlats.cancel();
    };
  }, [selectedProject, selectedRoom, priceRange, squareRange, fetchFilteredFlats]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const projectParam = queryParams.get('f[projects][]');
    const roomParam = queryParams.get('f[rooms][]');
    const priceMinParam = queryParams.get('f[price][min]');
    const priceMaxParam = queryParams.get('f[price][max]');
    const squareMinParam = queryParams.get('f[square][min]');
    const squareMaxParam = queryParams.get('f[square][max]');

    if (projectParam) setSelectedProject(Number(projectParam));
    if (roomParam) setSelectedRoom(Number(roomParam));
    if (priceMinParam) setPriceRange((prev) => ({ ...prev, min: Number(priceMinParam) }));
    if (priceMaxParam) setPriceRange((prev) => ({ ...prev, max: Number(priceMaxParam) }));
    if (squareMinParam) setSquareRange((prev) => ({ ...prev, min: Number(squareMinParam) }));
    if (squareMaxParam) setSquareRange((prev) => ({ ...prev, max: Number(squareMaxParam) }));
  }, []);

  useEffect(() => {
    const fetchFilters = async () => {
      const queryParams = new URLSearchParams();
      if (selectedProject) queryParams.append('f[projects][]', selectedProject.toString());
      if (selectedRoom) queryParams.append('f[rooms][]', selectedRoom.toString());
      queryParams.append('f[price][min]', priceRange.min.toString());
      queryParams.append('f[price][max]', priceRange.max.toString());
      queryParams.append('f[square][min]', squareRange.min.toString());
      queryParams.append('f[square][max]', squareRange.max.toString());

      const response = await fetch(`http://localhost:8083/api/v1/filters?${queryParams.toString()}`);
      const data: FiltersResponse = await response.json();
      setProjects(data.data.projects);
      setRooms(data.data.rooms);
    };

    fetchFilters();
  }, [selectedProject, selectedRoom, priceRange, squareRange]);

  const loadMore = async () => {
    if (currentPage < lastPage && !loading) {
      setLoading(true);
      const nextPage = currentPage + 1;
      const response = await fetch(`http://localhost:8083/api/v1/flats?per_page=9&page=${nextPage}`);
      const data: ApiResponse = await response.json();

      setFlats((prevFlats) => [...prevFlats, ...data.data]);
      setCurrentPage(nextPage);
      setLoading(false);
    }
  };

  return (
    <div className="xl:my-8 xl:mx-14 xs:my-5 xs:mx-5">
      <h4 className="9xl">
        Планировки
      </h4>
      <div className="grid xl:grid-cols-4 xs:grid-cols-1 gap-x-5 my-12">
        <div>
          <p className="label-selector">Проект</p>
          <select
            id="projects"
            className="selector"
            value={selectedProject ?? ''}
            onChange={(e) => setSelectedProject(parseInt(e.target.value, 10))}
          >
            <option value="">Все</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id} disabled={project.disabled}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="label-selector">Укажите количество комнат</p>
          <ul className="flex gap-3">
            {rooms.map((room) => (
              <li key={room.number} className="list-none">
                <input
                  type="radio"
                  id={room.number.toString()}
                  name="rooms"
                  value={room.number.toString()}
                  checked={selectedRoom === room.number}
                  disabled={room.disabled}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setSelectedRoom(value);
                  }}
                  className="hidden peer"
                />
                <label htmlFor={room.number.toString()} className="radio-selector">
                  <div className="block">
                    <div className="t7">{room.number !== 0 ? `${room.number}к` : 'Ст'}</div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-selector">Стоимость</p>
          <div className="w-full">
            <RangeSlider
              initialMax={priceRange.max}
              initialMin={priceRange.min}
              min={filtersResponse.data.price.min}
              max={filtersResponse.data.price.max}
              step={1}
              priceCap={1}
              char="₽"
              onChange={(min, max) => setPriceRange({ min, max })}
            />
          </div>
        </div>
        <div>
          <p className="label-selector">Задайте площадь, м²</p>
          <div className="w-full">
            <RangeSlider
              initialMax={squareRange.max}
              initialMin={squareRange.min}
              min={filtersResponse.data.square.min}
              max={filtersResponse.data.square.max}
              step={1}
              priceCap={1}
              onChange={(min, max) => setSquareRange({ min, max })}
            />
          </div>
        </div>
      </div>
      <div className="xl:visible xs:collapse xl:mb-16 xs:mb-0 grid grid-cols-3  text-black t8">
        <div />
        <p className="text-center">
          Найдено
          {' '}
          {totalFlats}
          {' '}
          квартир
        </p>
        <button
          type="button"
          className="justify-self-end"
          onClick={() => {
            setSelectedProject(null);
            setSelectedRoom(null);
            setPriceRange({
              min: filtersResponse.data.price.min_range,
              max: filtersResponse.data.price.max_range,
            });
            setSquareRange({
              min: filtersResponse.data.square.min_range,
              max: filtersResponse.data.square.max_range,
            });
            router.push('/', undefined, { shallow: false });
          }}
        >
          ↻ Очистить всё
        </button>
      </div>
      <hr className="border border-black-100/20" />
      <div className="grid xl:grid-cols-3 gap-5 xs:grid-cols-1 my-12">
        {flats.map((flat) => (
          <div key={flat.id} className="card">
            <div className="flex justify-between">
              <div>
                <p className="t6-medium">
                  {flat.rooms === 0 ? 'Студия' : `${flat.rooms}-комнатная`}
                  {' '}
                  {flat.square}
                  {' '}
                  м²
                </p>
                <div className="flex items-end">
                  <p className="t3">
                    {numberWithSpaces(Number(flat.price))}
                    {' '}
                    ₽
                  </p>
                  <p className="t11 line-through decoration-2 mx-3 opacity-80 leading-7">
                    {numberWithSpaces(Number(flat.old_price))}
                    {' '}
                    ₽
                  </p>
                </div>
              </div>
              <button className="button-like" type="button">♥</button>
            </div>
            <img src={flat.image} alt={flat.project_title} className="w-full h-auto my-2" />
            <div className="flex">
              <table className="table w-full">
                <tbody>
                  <tr>
                    <td>Проект</td>
                    <td>{flat.project_title}</td>
                  </tr>
                  <tr>
                    <td>Этаж</td>
                    <td>{flat.floor}</td>
                  </tr>
                  <tr>
                    <td>Срок сдачи</td>
                    <td>{flat.release_dates}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center">
        <button
          onClick={loadMore}
          className={`xl:w-1/3 xs:w-full bg-blue text-white p-1 rounded-md t6-medium ${currentPage >= lastPage ? 'collapse' : 'visible'}`}
          disabled={loading}
          type="button"
        >
          {loading ? 'Загрузка...' : 'Показать еще'}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
