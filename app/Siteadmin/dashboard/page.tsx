// app/admin/page.tsx
import React from 'react';

export default function AdminHomePage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold">Users</h3>
          <p className="text-3xl font-bold mt-2">1,024</p>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold">Orders</h3>
          <p className="text-3xl font-bold mt-2">563</p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold">Messages</h3>
          <p className="text-3xl font-bold mt-2">87</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold">Reports</h3>
          <p className="text-3xl font-bold mt-2">231</p>
        </div>
      </div>
    </div>
  );
}
