import Image from "next/image";
import ChakraSpinner from "../../chakraSpinner";
import Header from "../../header";
import ParallaxHero from "../../parallaxHero";

export default function DhamHero() {
  return (
    <section className="relative bg-linear-[to_top_right,#FFFFFF,rgba(241,180,76,0.24)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <div className="w-[370px] h-[190px] relative max-md:w-[148px] max-md:h-[76px]">
          <Image src={"/assets/chakra_bg.png"} alt="chakra" fill />
        </div>
      </div>

      <div className="absolute max-md:hidden top-[8%] animate-[cloud-move_300s_linear_infinite] z-1">
        <div className="w-[460px] h-[285px] relative">
          <Image
            fill
            alt="cloud-0"
            src="/assets/header_cloud_0.png"
          />
        </div>
      </div>

      {/* Add this to your global CSS file (globals.css or similar) */}
      <style jsx global>{`
  @keyframes cloud-move {
    0% {
      left: 15px;
    }
    50% {
      left: 50%;
      transform: translateX(-50%);
    }
    100% {
      left: 15px;
    }
  }
`}</style>

      <div className="absolute max-md:hidden top-[20%] animate-cloud1 z-[1]">
        <div className="w-[460px] h-[285px] relative">
          <Image
            fill
            alt="cloud-1"
            src="/assets/header_cloud_1.png"
          />
        </div>
      </div>

      {/* Custom CSS for the animation */}
      <style jsx>{`
        @keyframes cloudMove1 {
          0% {
            right: -5%;
          }
          50% {
            right: 50%;
            transform: translateX(50%);
          }
          100% {
            right: -5%;
          }
        }

        .animate-cloud1 {
          animation: cloudMove1 300s linear infinite;
        }
      `}</style>

      <div className="absolute max-md:hidden top-[30%] animate-cloud2 z-[1]">
        <div className="w-[460px] h-[285px] relative">
          <Image
            fill
            alt="cloud-2"
            src="/assets/header_cloud_2.png"
          />
        </div>
      </div>

      {/* Custom CSS for the animation */}
      <style jsx>{`
        @keyframes cloudMove2 {
          0% {
            left: -5%;
          }
          50% {
            left: 50%;
            transform: translateX(-50%);
          }
          100% {
            left: -5%;
          }
        }

        .animate-cloud2 {
          animation: cloudMove2 300s linear infinite;
        }
      `}</style>

      <Header />

      <div className="mt-[4.5%]">
        <ParallaxHero />
      </div>

      <div className="relative mt-[5%]">
        <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 flex items-center">
          <div className="w-[calc(100vw+100px)] h-[calc((100vw+100px)/2)] bg-gradient-to-t from-white/80 to-[#FFEBC3]/80 rounded-[calc((100vw+100px)/2)_calc((100vw+100px)/2)_0_0] blur-xs max-md:relative max-md:-left-[5%]">

          </div>
        </div>

        <div className="absolute -top-[10px] left-1/2 -translate-x-1/2">
          <ChakraSpinner></ChakraSpinner>
        </div>

        <div className="w-screen h-[calc((100vw+100px)/2)] relative mt-[40px]">
          <Image fill
            alt="jeevan vigyan dham"
            src={'/assets/dham_cover.png'}
            className="object-cover object-top" />
        </div>
      </div>

      <div
        className="py-[20px] bg-linear-[to_right,#D9B765,#CBAA59,#ECD46D,#E4C45F] flex items-center justify-center z-[1] relative max-md:px-[20px] max-md:py-[7px]">
        <h2 className="text-[36px] leading-relaxed max-md:text-[18px] font-bold text-white text-center">
          धाम बनाउने काम केवल भवन होइन, हाम्रो श्रद्धा, संकल्प र सेवाभाव हो।
        </h2>
      </div>
    </section>
  )
}
