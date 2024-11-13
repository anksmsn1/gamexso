"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
 

interface CmsData {
  id: number;
  title: string;
  testimonial: string; // HTML content field
  image: string; // New column for image URL
}

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const Testimonials = () => {
  const [cmsData, setCmsData] = useState<CmsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(''); // To handle validation errors

  // Fetch data when component mounts
  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch('/api/testimonials/'); // Replace with your API endpoint
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
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-black-900 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Testimonials</h2>
        <div className="flex justify-center">
          <div className="max-w-lg w-full"> {/* Increased max width */}
            <Slider {...settings}>
              {cmsData.map((testimonials, index) => (
                <div key={index} className="bg-black p-6 rounded-lg shadow-lg text-white text-center flex flex-col items-center">
                  <img 
                    src={testimonials.image} 
                    alt={testimonials.title} 
                    className="w-20 h-20 rounded-full mb-4 mx-auto" // Centered image
                  />
                  <p className="text-lg italic">"{testimonials.testimonial}"</p>
                  <p className="mt-4 font-bold">{testimonials.title}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
