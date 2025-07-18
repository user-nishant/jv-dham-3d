'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';

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
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <section className='max-w-[650px]'>
            <Slider {...settings}>
                {imageList.map(item => (
                    <div key={item.key}
                        className='!w-[290px] h-[200px] relative'>
                        <Image fill
                            alt={`dham-${item.key}`}
                            src={item.path}
                            className='pr-[15px] object-cover' />
                    </div>
                ))}
            </Slider>
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
