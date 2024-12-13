"use client";

import Image from "next/image";
import SlickWrapper from "./SlickWrapper";
import appImage1 from "/public/banner1.png";
import appImage2 from "/public/banner2.png";
import appImage3 from "/public/banner3.png";
import appImage4 from "/public/banner4.png";

const Layout: React.FC = () => {
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleIosClick = () => {
    alert("Coming Soon!");
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start md:justify-center px-4">
      <div className="container mx-auto max-w-screen-lg flex flex-col md:flex-row items-center md:justify-between space-y-8 md:space-y-0 py-4 md:py-8 lg:py-16">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 lg:w-2/5 space-y-4 md:space-y-6 text-center md:text-left">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="text-red-600">Every Second</span>
              <br className="hidden md:block" />
              New Registration
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              <span className="text-red-600">2 Crore +</span>
              <br className="hidden md:block" />
              Highest Winnings Everyday
            </h2>
          </div>
          <div className="bg-yellow-500 text-black font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg text-base md:text-lg">
            12 lakhs + GST Refund <br /> Everyday
          </div>
          <div className="flex space-x-4 mt-4 md:mt-6">
            <a href="#" onClick={handleIosClick} className="flex items-center space-x-2">
              <img src="/apple.png" alt="Apple Logo" className="h-10" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.beastblocks.gamexso"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <img src="/android.png" alt="Android Logo" className="h-10" />
            </a>
          </div>
        </div>

        {/* Right Section with Slider */}
        <div className="w-full md:w-3/4 lg:w-2/5 mt-6 md:mt-0">
          <SlickWrapper settings={sliderSettings}>
            <div>
              <Image src={appImage1} alt="App Image 1" layout="responsive" className="rounded-lg md:h-[400px]" />
            </div>
            <div>
              <Image src={appImage2} alt="App Image 2" layout="responsive" className="rounded-lg md:h-[400px]" />
            </div>
            <div>
              <Image src={appImage3} alt="App Image 3" layout="responsive" className="rounded-lg md:h-[400px]" />
            </div>
            <div>
              <Image src={appImage4} alt="App Image 4" layout="responsive" className="rounded-lg md:h-[400px]" />
            </div>
          </SlickWrapper>
        </div>
      </div>
    </div>
  );
};

export default Layout;
