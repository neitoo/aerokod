import { ApiResponse, Flat } from '@/types/Flats';
import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';

interface HomePageProps {
  apiResponse: ApiResponse;
}

const HomePage: NextPage<HomePageProps> = ({apiResponse}) => {

  const [flats, setFlats] = useState<Flat[]>(apiResponse.data);
  const [currentPage, setCurrentPage] = useState<number>(apiResponse.meta.current_page);
  const [lastPage, setLastPage] = useState<number>(apiResponse.meta.last_page);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMore = async () => {
    if(currentPage < lastPage && !loading){
      setLoading(true);
      const nextPage = currentPage + 1;
      const response = await fetch(`http://localhost:8083/api/v1/flats?per_page=9&page=${nextPage}`);
      const data: ApiResponse = await response.json();

      setFlats(prevFlats => [...prevFlats, ...data.data]);
      setCurrentPage(nextPage);
      setLoading(false);
    }
  };

  return (
    <div className='xl:my-8 xl:mx-14 xs:my-5 xs:mx-5'>
      <h4 className='9xl mb-6'>
        Планировки
      </h4>
      <div className='grid xl:grid-cols-3 gap-5 xs:grid-cols-1'>
        {flats.map((flat) => (
          <div key={flat.id} className='card'>
            <div className='flex justify-between'>
              <div>
                <p className='t6-medium'>{flat.rooms === 0 ? `Студия` : `${flat.rooms}-комнатная`} {flat.square} м²</p>
                <div className='flex items-end'>
                  <p className='t3'>{numberWithSpaces(Number(flat.price))} ₽</p>
                  <p className='t11 line-through decoration-2 mx-3 opacity-80 leading-7'>{numberWithSpaces(Number(flat.old_price))} ₽</p>
                </div>
              </div>
              <button className='button-like'>♥</button>

            </div>
            <img src={flat.image} alt={flat.project_title} className='w-full h-auto my-2' />
            <div className="flex">
              <table className='table w-full'>
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

      <div className='flex w-full justify-center'>
        <button
          onClick={loadMore} 
          className='xl:w-1/3 xs:w-full bg-blue text-white p-1 rounded-md my-8 t6-medium'
          disabled={loading}>
          {loading ? 'Загрузка...' : 'Показать еще'}
        </button>
      </div>
    </div>
  );
  
};

export const getStaticProps: GetStaticProps = async () =>{
  const response = await fetch('http://localhost:8083/api/v1/flats?per_page=9&page=1');
  const data: ApiResponse = await response.json();

  if(!data){
    return{
      notFound: true,
    }
  }
  return {
    props: {apiResponse: data},
  }
}

export function numberWithSpaces(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default HomePage;
