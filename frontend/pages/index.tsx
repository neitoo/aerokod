import { FiltersResponse } from '@/types/Filters';
import { ApiResponse, Flat } from '@/types/Flats';
import { GetStaticProps, NextPage } from 'next';
import React, { useState } from 'react';

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

export function numberWithSpaces(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const HomePage: NextPage<HomePageProps> = ({ apiResponse, filtersResponse }) => {
  const [flats, setFlats] = useState<Flat[]>(apiResponse.data);
  const [currentPage, setCurrentPage] = useState<number>(apiResponse.meta.current_page);
  const [lastPage] = useState<number>(apiResponse.meta.last_page);
  const [loading, setLoading] = useState<boolean>(false);
  const [projects] = useState(filtersResponse.data.projects);
  const [rooms] = useState(filtersResponse.data.rooms);
  const [price] = useState(filtersResponse.data.price);
  const [square] = useState(filtersResponse.data.square);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  console.log(selectedRoom);

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
      <div className="grid grid-cols-4 gap-x-5 my-12">
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
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="label-selector">Укажите количество комнат</p>
          <ul className="flex gap-3">
            {rooms.map((room) => (
              <li className="list-none">
                <input type="radio" id={room.number.toString()} name="rooms" value={room.number.toString()} onChange={(e) => setSelectedRoom(parseInt(e.target.value, 10))} className="hidden peer" />
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
          <div className="w-full selector">
            <div className="flex horizontal justify-between">
              <p>
                от
                {' '}
                {numberWithSpaces(price.min_range)}
                {' '}
                ₽
              </p>
              <p>
                —
              </p>
              <p>
                до
                {' '}
                {numberWithSpaces(price.max_range)}
                {' '}
                ₽
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="label-selector">Задайте площадь, м²</p>
          <div className="w-full selector">
            <div className="flex horizontal justify-between">
              <p>
                от
                {' '}
                {square.min_range}
              </p>
              <p>
                —
              </p>
              <p>
                до
                {' '}
                {square.max_range}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:visible xs:collapse grid grid-cols-3 mb-16 text-black t8">
        <div />
        <p className="text-center">
          Найдено
          {' '}
          {apiResponse.meta.total}
          {' '}
          квартир
        </p>
        <button type="button" className="justify-self-end">
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
