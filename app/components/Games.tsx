"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
interface CmsData {
  id: number;
  title: string;
  content: string; // HTML content field
  image: string; // New column for image URL
}


const Games = () => {
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
  return (
    <section className=" bg-black text-center">
      {/* Main Heading */}
      <h2 className="text-4xl font-bold mb-10 text-white-800">Our Games</h2>

      {/* Thumbnails Container with Increased Width */}
      <div className="container mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
     { cmsData.map((item) => (
    <div
      key={item.id}
      className="bg-transparent rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
    >
      {/* Image */}
      <div className="relative w-full flex justify-center items-center p-4">
        <div className="w-40 h-40 border border-gray-300 rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src={item.image}
            alt={item.title}
            width={150}
            height={170}
            className="rounded-full" // Make the image itself circular
          />
        </div>
      </div>

      {/* Title */}
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-white-700">{item.title}</h3>
      </div>
    </div>
  ))}
</div>

    </section>
  );
};

export default Games;
