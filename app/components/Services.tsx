"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "./Loader";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your API endpoint
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (err:any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <header className="bg-red-600 text-white py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-center">Our Services</h1>
          <p className="text-center mt-2">
            Empowering your business with innovative solutions.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 bg-black">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((service:any, index) => (
            <div
              key={index}
              className="bg-black shadow-lg rounded-lg p-6 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={100}
                  height={100}
                  className="mr-4 rounded-full"
                />
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              <p className="text-white-600 mb-4">{service.content}</p>
             
            </div>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-1 place-items-center">
          <a
            href="tel:9161610042"
            className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12h6m-3-3l3 3-3 3m-9 5l-3-3 3-3M3 9l3 3-3 3m0-8l3 3-3 3"
              />
            </svg>
            Call Now for more details!
          </a>
        </div>
      </main>
    </div>
  );
};

export default ServicesPage;
