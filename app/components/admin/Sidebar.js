"use client";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-800 h-screen p-5 pt-8 transition-width duration-300 fixed`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white focus:outline-none"
      >
        ☰
      </button>
      <nav className="mt-10">
        <ul>
          <li className="text-white mb-5">
            <Link href="/Siteadmin/dashboard">
              <span className="text-lg">{isOpen ? "Dashboard" : "D"}</span>
            </Link>
          </li>
          <li className="text-white mb-5">
            <Link href="/Siteadmin/cmslist">
              <span className="text-lg">{isOpen ? "CMS" : "C"}</span>
            </Link>
          </li>
          <li className="text-white mb-5">
            <Link href="/Siteadmin/features">
              <span className="text-lg">{isOpen ? "Features" : "F"}</span>
            </Link>
          </li>
          <li className="text-white mb-5">
            <Link href="/Siteadmin/games">
              <span className="text-lg">{isOpen ? "Games" : "G"}</span>
            </Link>
          </li>
          <li className="text-white mb-5">
            <Link href="/Siteadmin/partners">
              <span className="text-lg">{isOpen ? "Our Partners" : "P"}</span>
            </Link>
          </li>
          <li className="text-white mb-5">
            <Link href="/Siteadmin/testimonials">
              <span className="text-lg">{isOpen ? "Testimonials" : "T"}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
