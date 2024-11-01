// components/DownloadGameBanner.js
import React from 'react';

const DownloadGameBanner = () => {
  return (
<div className="flex items-center justify-center h-screen bg-black">
  <div className="bg-red-700 p-10 rounded-lg shadow-lg w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 text-center">
    <h2 className="text-3xl font-semibold text-white mb-4">Download and Enjoy the Game!</h2>
    <p className="text-white mb-6">Scan the QR code below to download the game directly to your device. Jump into the excitement now!</p>
    
    <div className="flex justify-center items-center p-4 rounded-lg">
      <img
        src="/qr.jpeg"
        alt="Scan to Download Game"
        className="w-36 h-36"
      />
    </div>
    
    <p className="text-sm text-gray-300 mt-4">Point your camera at the QR code to download instantly.</p>

    <a
      href="https://play.google.com/store/apps/details?id=com.beastblocks.gamexso"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
    >
      Download from Google Play
    </a>
  </div>
</div>

  
  );
};

export default DownloadGameBanner;
