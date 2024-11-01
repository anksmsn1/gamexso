// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-12 space-y-10">
        
        {/* Two-column Layout */}
        <div className="flex flex-col lg:flex-row items-start justify-between space-y-8 lg:space-y-0">
          
          {/* Left Column: QR Code, Text, and Download Button */}
          <div className="lg:w-3/4 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
            
            {/* QR Code Section */}
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
              <img
                src="/qr.jpeg"
                alt="Scan to Download Game"
                className="w-32 h-32"
              />
              <p className="text-gray-800 text-sm mt-2">Scan to Download</p>
            </div>
            
            {/* Text Content and Download Button */}
            <div className="text-center md:text-left md:flex-1">
              <h3 className="text-2xl font-semibold mb-3">Download the Game Now!</h3>
              <p className="text-gray-400 mb-4">
                Ready to start your adventure? Scan the QR code or click the link to download!
              </p>
              <a
                href="https://your-game-download-link.com"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg"
              >
                Download Game
              </a>
            </div>
          </div>
          
          {/* Right Column: Important Links */}
          <div className="lg:w-1/4 text-center lg:text-left">
            <h4 className="text-lg font-semibold mb-2">Important Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#terms" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="#support" className="text-gray-400 hover:text-white">Support</a></li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-700"></div>
        
        {/* Footer Bottom */}
        <div className="text-center text-gray-500">
          © 2024  Gamexso Games Private Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
