"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/logo.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
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
          <Link href="/features">Features</Link>
          <Link href="/games">Games</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/blog">Blog</Link>
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
  );
};

export default Navbar;
