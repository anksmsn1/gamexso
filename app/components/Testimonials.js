"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const testimonials = [
  {
    name: "John Doe",
    feedback: "This service was fantastic! I couldn't be happier with the experience.",
    image: "/user.png", // Add the path to the image
  },
  {
    name: "Jane Smith",
    feedback: "Absolutely amazing! Highly recommend to everyone.",
    image: "/user.png",
  },
  {
    name: "Alice Johnson",
    feedback: "A life-changing experience! The team was incredible.",
    image: "/user.png",
  },
  {
    name: "Bob Brown",
    feedback: "An excellent service with great support.",
    image: "/user.png",
  },
];

const Testimonials = () => {
  const settings = {
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
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-black p-6 rounded-lg shadow-lg text-white text-center flex flex-col items-center">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-20 h-20 rounded-full mb-4 mx-auto" // Centered image
              />
              <p className="text-lg italic">"{testimonial.feedback}"</p>
              <p className="mt-4 font-bold">{testimonial.name}</p>
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
