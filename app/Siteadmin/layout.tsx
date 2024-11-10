// app/admin/layout.tsx
import React from 'react';
import Header from '../components/admin/Header';
import Footer from '../components/admin/Footer';
import Sidebar from '../components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Fixed Sidebar */}
        <div style={{ width: '250px', position: 'fixed', top: '60px', bottom: 0, left: 0 }}>
          <Sidebar />
        </div>

        {/* Scrollable Main Content */}
        <main style={{
          flex: 1,
          marginLeft: '250px',
          padding: '20px',
          overflowY: 'auto',
          height: 'calc(100vh - 120px)', // Adjust based on header/footer height
        }}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
