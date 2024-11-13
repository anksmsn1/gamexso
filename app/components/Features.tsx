"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
interface CmsData {
  id: number;
  title: string;
  content: string; // HTML content field
  image: string; // New column for image URL
}

const Features = () => {
  const [cmsData, setCmsData] = useState<CmsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
 
  const [error, setError] = useState<string>(''); // To handle validation errors

  // Fetch data when component mounts
  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch('/api/features/'); // Replace with your API endpoint
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
  return (
    <section className=" bg-black text-center">
      {/* Main Heading */}
      <h2 className="text-4xl font-bold mb-10 text-white-800">Our Features</h2>

      {/* Thumbnails Container with Increased Width */}
      <div className="container mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      { cmsData.map((feature) => (
          <div
            key={feature.id}
            className="bg-transparent  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-40 flex justify-center items-center border border-gray-300 p-4 rounded-lg">
  <Image
    src={feature.image}
    alt={feature.title}
    width={150}
    height={150} // Set a fixed height for the image
  />
</div>
            
            {/* Title */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white-700">{feature.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
