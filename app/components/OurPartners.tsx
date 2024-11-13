"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";


interface CmsData {
  id: number;
  title: string;
  content: string; // HTML content field
  image: string; // New column for image URL
}


const Slider = dynamic(() => import('react-slick'), { ssr: false });

const OurPartners = () => {
  const [cmsData, setCmsData] = useState<CmsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
 
  const [error, setError] = useState<string>(''); // To handle validation errors

  // Fetch data when component mounts
  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch('/api/games/'); // Replace with your API endpoint
        const data = await response.json();
        setCmsData(data);
      } catch (error) {
        console.error('Error fetching CMS data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCmsData();
  }, []);

  const settings: any = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className=" bg-black text-center">
      {/* Main Heading */}
      <h2 className="text-4xl font-bold mb-10 text-white-800">Our Partners</h2>
      <div className="container mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-8">
        <Slider {...settings}>
          {cmsData.map((partner, index) => (
            <div key={index} className="partnerLogo flex justify-center items-center">
              <Image
                src={partner.image}
                alt={partner.title}
                width={150}
                height={150}
                className="circularImage"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default OurPartners;
