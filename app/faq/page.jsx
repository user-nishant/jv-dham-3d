import Image from "next/image";
import Header from "../components/header";
import {Button, Collapse} from "antd";
// import Slider from "react-slick";
import dynamic from "next/dynamic";
import Footer from "../components/footer";
import {MdAddCircle, MdRemoveCircle} from "react-icons/md";
import Faqs from "@/app/components/faqs";

export const metadata = {
    title: 'Jeevan Vigyan Dham | जीवन विज्ञान | Jeevan Vigyan – आध्यात्मिक प्रयोगशाला नेपाल',
    description: 'जीवन विज्ञान: योग, ध्यान, साधना र मनोविज्ञानका माध्यमबाट मानव कल्याण र आत्म‑उत्थानको मार्गदर्शन',
    openGraph: {
        title: 'Jeevan Vigyan – आध्यात्मिक प्रयोगशाला नेपाल',
        description: 'योग, ध्यान, साधना र मनोविज्ञानका कार्यक्रमहरू गरी नेपाल र विश्वभर विद्यार्थीहरूलाई आत्म‑शक्ति प्रदान गरिन्छ।',
        url: 'https://jeevanvigyan.org',
        type: 'website',
        images: [
            {
                url: 'https://jeevanvigyan.org/images/logo.png', // replace with real image if needed
                width: 1200,
                height: 630,
                alt: 'Jeevan Vigyan आध्यात्मिक प्रयोगशाला',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Jeevan Vigyan – आध्यात्मिक प्रयोगशाला नेपाल',
        description: 'योग र ध्यानका कार्यक्रमहरूद्वारा आत्म‑शक्ति र जीवन गुणस्तर वृद्धिको खोज।',
        images: ['https://jeevanvigyan.org/images/logo.png'],
        site: '@jeevanvigyan', // update if real Twitter handle is available
    },
    metadataBase: new URL('https://jeevanvigyan.org'),
};



const contribution = [
    {
        key: 1,
        icon: '/assets/gifs/charity.gif',
        title: 'आर्थिक योगदान',
        label: 'धामको दीर्घकालीन सञ्चालन र संरचना निर्माणमा तपाईंको आर्थिक सहयोग महत्वपूर्ण योगदान बन्न सक्छ।'
    },
    {
        key: 2,
        icon: '/assets/gifs/house.gif',
        title: 'आर्थिक योगदान',
        label: 'तपाईंले व्यक्तिगत वा पारिवारिक रूपमा पार्क, ध्यानकक्ष, आवास आदि भौतिक संरचना निर्माण गरेर प्रतिष्ठानलाई हस्तान्तरण गर्न सक्नुहुन्छ।'
    },
    {
        key: 3,
        icon: '/assets/gifs/high-five.gif',
        title: 'आर्थिक योगदान',
        label: 'आफ्ना सीप र क्षमतामार्फत सेवा प्रदान गरी आत्मिक सन्तुष्टि र पुण्यको अनुभूति प्राप्त गर्नुहोस्।'
    }
]


export default function FAQPage() {
    return (
        <>
            <main className=" w-full flex flex-col relative bg-[#FAF7ED]">


                <section className="relative before::content-none before:absolute before:top-0 before:left-0 before:w-full before:h-full before:opacity-[0.5] before:bg-[url('/assets/footer_bg.png')] before:bg-cover before:bg-center before:bg-no-repeat">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2">
                        <div className="w-[370px] h-[190px] relative">
                            <Image src={"/assets/chakra_bg.png"} alt="chakra" fill/>
                        </div>
                    </div>

                    <div className='relative'>
                        <Header/>
                        <div className='flex max-md:px-[20px] justify-center items-center flex-col gap-[22px] pt-[80px] pb-[30px]'>
                            <div className="flex flex-col items-center gap-[20px] max-sm:gap-[10px]">
                                <svg width="40" height="24" className="w-[40px] h-[24px] max-sm:w-[24px] max-sm:h-[14px]" viewBox="0 0 40 24"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18.4667 1.05122C17.5452 2.17497 15.6799 5.00682 15.4327 5.63612C15.3428 5.90582 15.6125 6.19799 16.3541 6.69244C17.3655 7.34422 18.9162 8.78261 19.6578 9.77151C19.9725 10.1761 20.0174 10.1985 20.2197 9.83894C20.7591 8.93994 21.703 7.99599 23.0515 7.05204C23.8381 6.49017 24.4898 5.88334 24.4898 5.72602C24.4898 5.34394 22.0401 1.65805 21.1636 0.714099C20.1747 -0.31975 19.5679 -0.252324 18.4667 1.05122Z"
                                        fill="#B8282E"/>
                                    <path
                                        d="M11.6584 1.65842C11.0516 1.95059 10.8043 3.18671 11.2538 3.72611C11.5685 4.10819 12.827 4.15314 13.2091 3.77106C13.5687 3.41146 13.5462 2.13039 13.2091 1.86069C12.6697 1.45614 12.1977 1.38872 11.6584 1.65842Z"
                                        fill="#B8282E"/>
                                    <path
                                        d="M27.2338 1.59124C25.8629 2.10817 26.2225 4.04102 27.7058 4.04102C28.6272 4.04102 28.9868 3.70389 28.9868 2.78242C28.9868 1.77104 28.2002 1.23164 27.2338 1.59124Z"
                                        fill="#B8282E"/>
                                    <path
                                        d="M4.82767 6.15283C4.46808 6.40005 4.44561 6.66975 4.55798 8.243C4.69282 10.1084 5.25468 12.9178 5.5918 13.4347C5.74912 13.6819 6.01881 13.6819 7.165 13.4572C7.90666 13.3223 9.30007 13.2549 10.244 13.2999L11.9296 13.4122L11.7947 11.8165C11.7273 10.7827 11.7722 9.70387 11.997 8.75992C12.1543 7.95083 12.2667 7.23163 12.2217 7.14173C12.0644 6.91698 8.33367 6.13035 6.71552 5.97303C5.65922 5.9056 5.09736 5.95055 4.82767 6.15283Z"
                                        fill="#B8282E"/>
                                    <path
                                        d="M32.3592 6.08605C31.4377 6.19842 30.0219 6.46812 29.2128 6.69287L27.752 7.09742L27.8643 7.86157C27.9317 8.2886 27.9767 9.70452 27.9767 11.0081V13.3679H30.2241C31.4602 13.3679 32.8986 13.4578 33.4155 13.5477L34.3369 13.7275L34.7864 11.7497C35.0561 10.6709 35.3258 9.05275 35.4157 8.17622C35.5281 6.8502 35.4831 6.53555 35.1685 6.2209C34.9662 6.01862 34.6291 5.8613 34.4268 5.8613C34.2246 5.88377 33.2806 5.97367 32.3592 6.08605Z"
                                        fill="#B8282E"/>
                                    <path
                                        d="M14.2891 8.80552C14.2217 9.0977 14.1543 10.0866 14.1543 11.0081C14.1543 12.8735 14.7611 14.5142 15.75 15.4132C16.3118 15.9301 17.7727 16.8516 17.9974 16.8516C18.3345 16.8516 18.6941 14.7389 18.5817 13.5702C18.4244 12.0194 17.6603 10.6934 16.1545 9.34492C14.8735 8.17622 14.4914 8.08632 14.2891 8.80552Z"
                                        fill="#B8282E"/>
                                    <path
                                        d="M24.0656 9.09692C22.9194 10.0184 21.9755 11.2545 21.5934 12.3333C21.2788 13.2997 21.2788 15.2101 21.5934 16.1316C21.8181 16.7609 21.8856 16.8058 22.4474 16.6036C23.3015 16.3114 24.7848 14.8505 25.2792 13.7942C25.9759 12.3333 26.0209 8.31029 25.3241 8.31029C25.1668 8.31029 24.605 8.66989 24.0656 9.09692Z"
                                        fill="#B8282E"/>
                                    <path
                                        d="M0.377666 12.7613C-0.453885 13.6603 0.175397 15.0537 1.41149 15.0537C2.04077 15.0537 2.69252 14.3345 2.69252 13.6603C2.69252 13.0984 1.88345 12.3567 1.27664 12.3567C0.984473 12.3567 0.579935 12.5365 0.377666 12.7613Z"
                                        fill="#B8282E"/>
                                    <path
                                        d="M37.6843 12.7613C36.8528 13.6603 37.482 15.0537 38.7181 15.0537C39.3474 15.0537 39.9992 14.3345 39.9992 13.6603C39.9992 13.0984 39.1901 12.3567 38.5833 12.3567C38.2911 12.3567 37.8866 12.5365 37.6843 12.7613Z"
                                        fill="#B8282E"/>
                                    <path
                                        d="M8.19637 15.615C8.08399 15.6599 7.70193 15.7498 7.34234 15.8172C6.78048 15.9521 6.75801 16.0195 6.98275 16.4465C7.38729 17.2107 9.25266 19.0986 9.92689 19.4582C11.0057 20.0201 12.7137 20.2448 13.9273 19.9751C14.5566 19.8403 15.096 19.638 15.1859 19.5256C15.3882 19.1885 14.2195 17.368 13.3655 16.7162C12.1519 15.7948 9.40998 15.2104 8.19637 15.615Z"
                                        fill="#B8282E"/>
                                    <path
                                        d="M28.1345 15.9073C26.831 16.3793 25.6623 17.3682 25.033 18.5593C24.5161 19.5033 24.7184 19.7505 26.1792 20.0202C28.6289 20.4697 31.0112 19.2785 32.7642 16.7164C33.2137 16.0421 33.2362 15.9972 32.8541 15.8399C31.8652 15.4578 29.3256 15.4803 28.1345 15.9073Z"
                                        fill="#B8282E"/>
                                    <path
                                        d="M18.7163 19.8856C18.0421 20.3575 17.8398 21.5487 18.2893 22.4252C19.368 24.4929 22.6268 22.9646 21.7953 20.7846C21.6604 20.425 21.3907 20.0204 21.166 19.8631C20.6491 19.4585 19.3006 19.481 18.7163 19.8856Z"
                                        fill="#B8282E"/>
                                </svg>

                                <h2 className="text-[36px] text-center max-md:text-[20px] leading-[44px] font-semibold text-[#3A3C5C]">
                                    कसरी सहभागिता जनाउने ?
                                </h2>
                            </div>
                            <p className="text-[20px] leading-[36px] w-[1005px] max-md:w-full max-sm:text-[20px] text-center text-jv-text-[#3A3C5C] ">
                                जीवन विज्ञान धाममा योगदान गर्ने तीन तरिका छन् — आर्थिक सहयोग, श्रमदान र सीप/विज्ञता
                                अनुसारको
                                सहभागिता। यो योगदान भावी पुस्तालाई समर्पित ऐतिहासिक संरचनामार्फत योग, ध्यान र साधनाको
                                स्थायी
                                केन्द्र बन्नेछ।
                            </p>
                        </div>
                        <section className='mx-[148px] max-md:mx-[20px]'>
                            <div className="w-full grid grid-cols-3 max-sm:grid-cols-1 gap-[40px] max-sm:gap-0 relative text-center">

                                <div className='col-span-3 absolute max-sm:hidden w-full h-full flex justify-evenly items-center '>
                                    <div
                                        className="w-[10px] h-[10px] bg-[#B8282E] rounded-full"></div>
                                    <div
                                        className="w-[10px] h-[10px] bg-[#B8282E] rounded-full"></div>

                                </div>
                                {contribution.map(item => (
                                    <article key={item.key}
                                             className="py-[20px] px-[26px] max-sm:p-0 gap-[20px] flex items-center justify-center flex-col">
                                        <div className="w-[48px] h-[48px] relative ">
                                            <Image fill
                                                   src={item.icon}
                                                   alt={item.title}/>
                                        </div>

                                        <h2 className="text-[26px] leading-[40px] text-center text-jv-red">
                                            {item.title}
                                        </h2>

                                        <p className="text-[20px] leading-[36px] text-jv-text-black text-center">
                                            {item.label}
                                        </p>
                                    </article>
                                ))}

                            </div>
                        </section>
                        <Faqs />

                        <div className="pb-[38px] z-1 relative flex items-center justify-center">
                            <Button variant='borderLess'
                                    className="!text-jv-red !shadow-none !border-none !bg-transparent  max-md:!text-[14px]"
                                    iconPosition="end">
                                थप जानकारीको लागि जीवन विज्ञान प्रतिष्ठानमा सम्पर्क गर्नुहोस्।
                            </Button>
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                            <div className="w-[358px] h-[226px] relative">
                                <Image fill alt="lotus" src={'/assets/lotus.png'}/>
                            </div>
                        </div>

                    </div>
                    <Footer showFullSection={false}/>

                </section>
            </main>

        </>
    );
}
