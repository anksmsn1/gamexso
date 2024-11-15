"use client"
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import Games from '../components/Games';
import StylishHr from "../components/StylishHr";
import OurPartners from '../components/OurPartners';
import Disclaimer from '../components/Disclaimer';
import Testimonials from '../components/Testimonials';
import DownloadGameBanner from '../components/DownloadGameBanner';
import Footer from '../components/Footer';
import ServicesPage from '../components/Services';
import { useState } from 'react';
export default function Home() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        message: ''
      });
    
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [responseMessage, setResponseMessage] = useState<string | null>(null);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        setIsSubmitting(true);
        setResponseMessage(null);
    
        try {
          const res = await fetch('/api/submit-enquiry', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const data = await res.json();
          setIsSubmitting(false);
          setResponseMessage(data.message);
        } catch (error) {
          setIsSubmitting(false);
          setResponseMessage('There was an error submitting the form. Please try again.');
        }
      };
  return (
    <>
    <Navbar/>
    <main className="bg-black text-white">
    <div className="min-h-screen bg-black flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Business Enquiry</h2>
        {responseMessage && (
          <div className="text-center mb-4">
            <p className="text-lg text-green-500">{responseMessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
              Contact Person
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-4 bg-red-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
          </button>
        </form>
      </div>
    </div>
      <Footer/>
    </main>
    </>
  );
}
