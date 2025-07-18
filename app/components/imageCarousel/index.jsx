'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './styles.module.scss';
import { useRef, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const imageList = [
    {
        "key": 0,
        "path": "/assets/dham-images/dham0.jpg"
    },
    {
        "key": 1,
        "path": "/assets/dham-images/dham1.jpg"
    },
    {
        "key": 2,
        "path": "/assets/dham-images/dham2.png"
    },
    {
        "key": 3,
        "path": "/assets/dham-images/dham3.jpg"
    },
    {
        "key": 4,
        "path": "/assets/dham-images/dham4.jpg"
    },
    {
        "key": 5,
        "path": "/assets/dham-images/dham5.jpg"
    },
    {
        "key": 6,
        "path": "/assets/dham-images/dham6.jpg"
    },
    {
        "key": 7,
        "path": "/assets/dham-images/dham7.png"
    },
    {
        "key": 8,
        "path": "/assets/dham-images/dham8.png"
    },
    {
        "key": 9,
        "path": "/assets/dham-images/dham9.png"
    },
    {
        "key": 10,
        "path": "/assets/dham-images/dham10.png"
    }
]

export function ImageCarousel() {
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        arrow: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        afterChange: () => setUpdateCount(updateCount + 1),
        beforeChange: (current, next) => setSlideIndex(next)
    };

    return (
        <section className={styles.sliderContainer}>
            <Slider {...settings}
                ref={sliderRef}>
                {imageList.map(item => (
                    <div key={item.key}
                        className='h-[200px] relative'>
                        <Image fill
                            alt={`dham-${item.key}`}
                            src={item.path}
                            className='pr-[15px] object-cover' />
                    </div>
                ))}
            </Slider>

            <div className='mt-[24px]'>
                <div className={`flex items-center gap-[28px] ${styles.sliderFooter}`}>
                    <div className='flex-1 flex items-center h-[4px] bg-[#D9D9D9]'>
                        {imageList.map((item, index) => (
                            <div key={`item-${index}`}
                                className={`flex-1 h-full ${slideIndex >= index ? 'bg-[#01B9F1]' : ''}`}>

                            </div>
                        ))}
                    </div>

                    <div className='flex items-center gap-[12px]'>
                        <button className={styles.chevronBtn}
                            onClick={() => sliderRef.current?.slickGoTo(slideIndex - 1)}>
                            <FaArrowLeft />
                        </button>

                        <button className={styles.chevronBtn}
                            onClick={() => sliderRef.current?.slickGoTo(slideIndex + 1)}>
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}
