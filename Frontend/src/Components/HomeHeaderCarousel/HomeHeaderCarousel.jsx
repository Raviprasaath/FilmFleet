import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import "./HomeHeader.css"
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleMovie } from '../../slice/slice';

const HomeHeaderCarousel = () => {
const { topRatedMovieList, screenMode} = useSelector((state) => state.movieReducer);
    const dispatch = useDispatch();

  return (
    <>
      <Swiper className="mySwiper "
        slidesPerView={1}
        autoplay={{
            delay: 1000,
          }}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {topRatedMovieList?.results?.slice(8, 20)?.map((item)=> (
            <SwiperSlide key={item.id} className='w-[90%]'>
                <Link onClick={()=>dispatch(getSingleMovie({ id:  item.id}))} to={`movie/${item.title}`}>
                    <div className={`cursor-pointer flex mm:flex-col lg:flex-row gap-5 justify-center items-center ${screenMode==="light"?'border':''}`}>
                        <img className='mm:h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[70vh] xl:h-[70vh]' src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="img" />
                        <div className='flex flex-col gap-5 p-5'>
                            <p className='text-[20px] font-bold'>
                              {item.title}
                            </p>
                            <p>
                              {item.overview}
                            </p>
                        </div>
                    </div>
                </Link>
            </SwiperSlide>

        ))}
      </Swiper>
    </>
  )
}

export default HomeHeaderCarousel
