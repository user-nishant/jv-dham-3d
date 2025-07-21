'use client';
import AboutUs from "./components/dhamPage/aboutUs";
import DhamDetails from "./components/dhamPage/dhamDetails";
import DhamGoals from "./components/dhamPage/dhamGoals";
import DhamHero from "./components/dhamPage/dhamHero";
import Footer from "./components/footer";

export default function Home() {
    return (
        <>
            <main className="min-h-screen w-full flex flex-col overflow-x-hidden">
                <DhamHero />
                <AboutUs />
                <DhamGoals />
                <DhamDetails />

                <section className="h-[87px] w-full flex items-center justify-center bg-linear-[to_right,#D9B765,#CBAA59,#ECD46D,#E4C45F] max-md:h-[70px] max-md:p-[20px]">
                    <h2 className="text-[30px] leading-relaxed font-semibold text-white text-shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-md:text-[18px]">
                        आउनुहोस्, स्वस्थ, शान्त र समृद्ध राष्ट्रका निर्माणको यो अभियानमा हातेमालो गरौँ !!
                    </h2>
                </section>
            </main >

            <Footer />
        </>
    );
}
