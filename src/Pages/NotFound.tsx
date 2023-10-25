import { Link } from 'react-router-dom'
import NotFoundSVG from '../assets/image/404.svg'
import NotFounHomeSVG from '../assets/image/iconmonstr-home.svg'

function NotFound() {
  return (
    <main className='container mx-auto'>
      <div className='px-[15px] mx-auto text-center container flex flex-wrap mt-10 justify-center'>
        <img className='mx-auto mb-10' src={NotFoundSVG} alt='404 error' />
        <p className='not-found-title w-full mb-6'>
          Усп. Кажется вы заблудились. Только без паники!
        </p>
        <p className='not-found-text w-full mb-14'>
          Страница, которую вы ищите не существует, либо была удалена
        </p>
        <Link to='/' className='content-center items-center'>
          <div className='bg-black rounded-md w-44 h-12 flex justify-center gap-4 items-center'>
            <img src={NotFounHomeSVG} alt='home' />
            <p className='home-button-text text-white'>Домой</p>
          </div>
        </Link>
      </div>
    </main>
  )
}

export default NotFound
