"use client";
import React from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const OurPartners = () => {
  const partners = [
    { logo: "/p1.png", name: "Partner 1" },
    { logo: "/p2.png", name: "Partner 2" },
    { logo: "/p4.png", name: "Partner 4" },
    // Add more partners as needed
  ];

  const settings = {
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
          {partners.map((partner, index) => (
            <div key={index} className="partnerLogo flex justify-center items-center">
              <Image
                src={partner.logo}
                alt={partner.name}
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
