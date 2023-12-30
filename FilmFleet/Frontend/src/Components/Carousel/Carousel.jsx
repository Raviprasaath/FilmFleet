import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation } from 'swiper/modules';
import "./Carousel.css"

import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSingleMovie } from '../../slice/slice';

const Carousel = (props) => {
    const dispatch = useDispatch();

    return (
    <>
      <Swiper className="mySwiper "
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 50,
        },
        }}
      >
        {props.props?.results?.slice((Math.floor(Math.random()*10)+1), (Math.floor(Math.random()*10)+20))?.map((item)=> (
            <SwiperSlide key={item.id} className='w-[90%]'>
                <Link onClick={()=>dispatch(getSingleMovie({ id:  item.id}))} to={`movie/${item.title}`}>
                    <div className='cursor-pointer flex flex-col justify-center items-center hover:opacity-60'>
                        <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="img" />
                        {item.title}
                    </div>
                </Link>
            </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Carousel