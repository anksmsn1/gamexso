"use client";
import { signOut } from "next-auth/react";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white flex justify-between items-center p-4">
      <h1 className="text-xl">Admin Dashboard</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
}
  