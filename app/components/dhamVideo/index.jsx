'use client';

import { useEffect, useRef, useState } from "react";

export default function DhamVideo() {
    const videoRef = useRef();
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Trigger fullscreen when video is near viewport top (adjust 200 as needed)
            if (videoRef.current) {
                const rect = videoRef.current.getBoundingClientRect();
                setIsFullscreen(rect.top < 200 && rect.bottom > 200);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            ref={videoRef}
            className={`px-[150px] pb-[72px] transition-all duration-700 ${isFullscreen
                ? "fixed inset-0 px-0 pb-0 z-[9999] w-full h-screen bg-black"
                : ""
                }`}
            style={{
                // Animate height and width
                width: isFullscreen ? "100vw" : "100%",
                height: isFullscreen ? "100vh" : "640px",
            }}
        >
            <div className={`w-full h-full bg-amber-50 relative z-1`}>
                <video
                    src="/assets/videos/dham.mp4"
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}
