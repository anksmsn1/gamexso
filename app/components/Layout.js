"use client";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dynamically import the Slider to handle SSR issues with Next.js
const Slider = dynamic(() => import('react-slick'), { ssr: false });

import appImage1 from '/public/banner1.png';  
import appImage2 from '/public/banner2.png';
import appImage3 from '/public/banner3.png';

const Layout = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">
      <div className="container mx-auto max-w-screen-lg flex flex-col md:flex-row items-center md:justify-between space-y-8 md:space-y-0 py-8 md:py-16">
        
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 lg:w-2/5 space-y-4 md:space-y-6 text-center md:text-left">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="text-red-600">5 Million +</span> <br className="hidden md:block" /> Registered Users
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              <span className="text-red-600">2 Crore +</span> <br className="hidden md:block" /> Daily Winnings
            </h2>
          </div>
          <div className="bg-yellow-500 text-black font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg text-base md:text-lg">
            12 lakhs + GST Refund <br /> Everyday
          </div>
          <div className="flex space-x-4 mt-4 md:mt-6">
            <a href="#" className="flex items-center space-x-2">
              <img src="/apple.png" alt="Apple Logo" className="w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a href="#" className="flex items-center space-x-2">
              <img src="/android.png" alt="Android Logo" className="w-6 h-6 md:w-8 md:h-8" />
            </a>
          </div>
        </div>

        {/* Right Section with Slider */}
        <div className="w-full md:w-1/2 lg:w-2/5 mt-6 md:mt-0">
          <Slider {...sliderSettings}>
            <div>
              <Image src={appImage1} alt="App Image 1" layout="responsive" className="rounded-lg" />
            </div>
            <div>
              <Image src={appImage2} alt="App Image 2" layout="responsive" className="rounded-lg" />
            </div>
            <div>
              <Image src={appImage3} alt="App Image 3" layout="responsive" className="rounded-lg" />
            </div>
          </Slider>
        </div>
        
      </div>
    </div>
  );
};

export default Layout;
