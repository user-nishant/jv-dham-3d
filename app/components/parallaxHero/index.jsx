'use client';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ParallaxHero() {
    const ref = useRef();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const scrollY = window.scrollY;
            ref.current.style.transform = `translateY(${scrollY * 1}px)`;
            setVisible(scrollY < 350); // Hide after 350px scroll
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            ref={ref}
            className="flex flex-col gap-[15px] items-center justify-center transition-opacity duration-500"
            style={{
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? "auto" : "none"
            }}
        >
            {/* <div
                className="min-w-[400px] h-[60px] bg-linear-[to_right,#D9B765,#CBAA59,#ECD46D,#E4C45F] flex items-center justify-center px-[20px] py-[12px] text-white text-[30px] leading-[36px] font-medium text-shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                style={{
                    clipPath:
                        "path('M386.006 20.3996C382.103 15.4276 376.748 0.0568235 348.352 0H234.85H50.6482C22.252 0 16.8966 15.3991 12.9942 20.3996C9.09177 25.3717 0 30.5142 0 30.5142C0 30.5142 9.05026 35.6283 12.9942 40.6287C16.8966 45.6008 22.252 61 50.6482 61H348.352C376.748 61 382.103 45.6008 386.006 40.6287C389.908 35.6567 399 30.5142 399 30.5142C399 30.5142 389.95 25.4001 386.006 20.3996Z')",
                }}
            >
                <span className="">
                    ‘युग बदल्ने धाम, बनाउने मेरो काम’
                </span>
            </div> */}
            <div className="w-[400px] h-[60px] relative">
                <Image fill src={'/assets/header_text.svg'} alt="‘युग बदल्ने धाम, बनाउने मेरो काम’"></Image>
            </div>

            <h1 className="text-[100px] leading-[116px] font-semibold text-jv-red text-center mt-[15px]">
                जीवन विज्ञान धाम
            </h1>

            <h3 className="text-[30px] leading-[44px] font-medium text-jv-red text-center">
                अन्तर्राष्ट्रिय आध्यात्मिक तथा आरोग्य केन्द्र
            </h3>
        </div>
    );
}

export default ParallaxHero;