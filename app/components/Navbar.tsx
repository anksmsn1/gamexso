"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/logo.png";
interface CmsData {
  id: number;
  title: string;
  slug: string; // HTML content field
  content: string; // HTML content field
  heroImage: string; // New column for image URL
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cmsData, setCmsData] = useState<CmsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch('/api/cms/'); // Replace with your API endpoint
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
    <><div className=" mx-auto flex justify-between items-center p-2 bg-red-500">
    {/* Left column with right-aligned link */}
    <div className="flex justify-end w-1/2 mr-5">
      <Link href="/services" className="text-white font-bold hover:text-gray-400">Our Services</Link>
    </div>

    {/* Divider */}
    <div className="border-l border-white h-3"></div>

    {/* Right column with left-aligned link */}
    <div className="flex justify-start w-1/2 ml-5">
      <Link href="/business" className="text-white font-bold hover:text-gray-400">Business Enquiries</Link>
    </div>
  </div>
    <nav className="bg-black text-white px-4 py-4 md:px-8">
    

      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <div className="w-auto">
              <Image src={Logo} className="object-contain" alt="Logo" />
            </div>
          </Link>
        </div>

        {/* Menu Items - Visible on larger screens */}
        <div className="hidden md:flex space-x-8">
          <Link href="/">Home</Link>
          {cmsData.map((pages, index) => (
          <Link href={`/pages/${pages.slug}`} key={pages.id}>{pages.title}</Link>
        ))}
         
          <Link href="/ourteam">Our Team</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        {/* Hamburger Icon - Visible on smaller screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link href="/">
            <a className="block px-4 py-2 hover:bg-gray-700 rounded">Home</a>
          </Link>
          <Link href="/features">
            <a className="block px-4 py-2 hover:bg-gray-700 rounded">
              Features
            </a>
          </Link>
          <Link href="/games">
            <a className="block px-4 py-2 hover:bg-gray-700 rounded">Games</a>
          </Link>
          <Link href="/reviews">
            <a className="block px-4 py-2 hover:bg-gray-700 rounded">Reviews</a>
          </Link>
          <Link href="/blog">
            <a className="block px-4 py-2 hover:bg-gray-700 rounded">Blog</a>
          </Link>
        </div>
      )}
    </nav>
    
    </>
  );
};

export default Navbar;
