"use client"
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

interface CmsData {
  id: number;
  title: string;
  slug: string;
  content: string;
  heroImage: string;
}

const Footer = () => {
  const [cmsData, setCmsData] = useState<CmsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State for dropdown

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch('/api/footermenu/'); // Replace with your API endpoint
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
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-12 space-y-10">
        
        {/* QR Code and Download Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between space-y-8 lg:space-y-0">
          <div className="lg:w-4/4 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
              <img
                src="/qr.png"
                alt="Scan to Download Game"
                className="w-32 h-32"
              />
              <p className="text-gray-800 text-sm mt-2">Scan to Download</p>
            </div>
            <div className="text-center md:text-left md:flex-1">
              <h3 className="text-2xl font-semibold mb-3">Download the Game Now!</h3>
              <p className="text-gray-400 mb-4">
                Ready to start your adventure? Scan the QR code or click the link to download!
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.league.board"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg"
              >
                Download Game
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>

        {/* Important Links Section */}
        <div className="mt-8">
          <h1 className="text-[1.5rem] text-center mb-10">Important Links</h1>

          {/* Mobile View: Dropdown */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full text-left bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-700"
            >
              {isDropdownOpen ? 'Hide Links' : 'Show Links'}
            </button>
            {isDropdownOpen && (
              <div className="mt-4 space-y-2">
                {cmsData.map((item) => (
                  <a
                    key={item.slug}
                    href={`/pages/${item.slug}`}
                    className="block text-gray-400 hover:text-white text-lg px-4"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Desktop View: Grid */}
          <div className="hidden lg:grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {cmsData.map((item) => (
              <a
                key={item.slug}
                href={`/pages/${item.slug}`}
                className="text-center text-gray-400 hover:text-white text-lg"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>
        
        {/* Footer Bottom */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/gamexsoofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 4L20 20M4 20L20 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/gamexsoofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaLinkedinIn size={24} />
            </a>
          </div>
          <div className="text-center text-gray-500">
            © 2025 Gamexso Games Private Limited. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
