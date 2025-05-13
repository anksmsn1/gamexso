"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SlickWrapper from "./SlickWrapper";

interface Banner {
  id: number;
  image: string;
}

const Layout: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch banner images dynamically
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("/api/banners"); // Replace with your actual API endpoint
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

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
              Registered new users
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              <span className="text-red-600">12 Lacks +</span>
              <br className="hidden md:block" />
              Highest Winnings Everyday
            </h2>
          </div>
          <div className="bg-yellow-500 text-black font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg text-base md:text-lg">
            Winning + GST Refund Everyday
          </div>
          <div className="flex space-x-4 mt-4 md:mt-6">
            <a href="#" onClick={handleIosClick} className="flex items-center space-x-2">
              <img src="/apple.png" alt="Apple Logo" className="h-10" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.league.board"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <img src="/android.png" alt="Android Logo" className="h-10" />
            </a>
          </div>
        </div>

        {/* Right Section with Dynamic Banner Slider */}
        <div className="w-full md:w-3/4 lg:w-2/5 mt-6 md:mt-0">
          {loading ? (
            <p className="text-white text-center">Loading banners...</p>
          ) : banners.length === 0 ? (
            <p className="text-white text-center">No banners available</p>
          ) : (
            <SlickWrapper settings={sliderSettings}>
              {banners.map((banner) => (
                <div key={banner.id}>
                  <Image
                    src={banner.image}
                    alt={`Banner ${banner.id}`}
                    width={800}
                    height={400}
                    layout="responsive"
                    className="rounded-lg md:h-[400px]"
                  />
                </div>
              ))}
            </SlickWrapper>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
