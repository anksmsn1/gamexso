"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

interface CmsData {
  id: number;
  title: string;
  testimonial: string;
  image: string;
}

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const Testimonials = () => {
  const [cmsData, setCmsData] = useState<CmsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch("/api/testimonials/");
        const data = await response.json();
        console.log("Fetched CMS Data:", data); // Debugging
        setCmsData(Array.isArray(data) ? data : []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching CMS data:", error);
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
    <div className="bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Testimonials
        </h2>
        <div className="flex justify-center">
          <div className="max-w-lg w-full">
            {cmsData.length === 0 ? (
              <p className="text-center text-white">No testimonials available</p>
            ) : (
              <Slider {...settings}>
                {cmsData.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-black p-6 rounded-lg shadow-lg text-white text-center flex flex-col items-center"
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.title}
                      className="w-20 h-20 rounded-full mb-4 mx-auto"
                    />
                    <p className="text-lg italic">"{testimonial.testimonial}"</p>
                    <p className="mt-4 font-bold">{testimonial.title}</p>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
