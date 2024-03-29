import React, { useRef } from 'react';
import styles from './GalleryMain.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import Name from './../../ui/Name/Name';
import sprite from './../../images/icons/sprite.svg';
import { Link } from 'react-router-dom';


const GalleryMain = (props) => {
    let server = 'https://vitamin-art.ru:4444'

    let { slides } = props;

    const swiperRef = useRef();
    return (
        <section className={styles.wrapper}>
            <div className={styles.wrap}>
                <div className="container">
                    <div className={styles.head}>
                        <Name
                            name={props.name}
                        />
                        <Link to={props.buttonLink}>{props.buttonName}</Link>
                    </div>
                </div>
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={20}
                    slidesPerView='auto'
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: true,
                    }}
                    className={styles.slider}
                >
                    {slides.map((image, index) => (
                        props.galleryMime[index].indexOf('image') ?
                            <SwiperSlide key={index}>
                                <video src={image} controls loading='lazy'></video>
                            </SwiperSlide>
                            :
                            <SwiperSlide key={index}>
                                <img src={image} alt='slide' loading='lazy'/>
                            </SwiperSlide>
                    ))}
                </Swiper>
                <div className="container">
                    <div className={styles.buttons}>
                        <button onClick={() => swiperRef.current?.slidePrev()} className={styles.sliderPrev}>
                            <svg className='icon'>
                                <use xlinkHref={`${sprite}#icon-arrow-slider`}></use>
                            </svg>
                        </button>
                        <button onClick={() => swiperRef.current?.slideNext()} className={styles.sliderNext}>
                            <svg className='icon'>
                                <use xlinkHref={`${sprite}#icon-arrow-slider`}></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GalleryMain;