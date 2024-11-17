"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define a type for the form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  // Explicitly type the form data state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Implement your form submission logic here (e.g., sending data to an API)
  };

  return (
    <>
      <Navbar />
      <main className="bg-black text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="contact-details">
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="mb-6">We'd love to hear from you! Feel free to reach out through any of the following ways:</p>
              <div className="contact-info space-y-4">
                <div className="contact-item">
                  <h3 className="text-xl font-semibold">Phone</h3>
                  <p><a href='tel:+919161610042'>+91-9161610042</a></p>
                </div>
                <div className="contact-item">
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p>support@gamexso.com</p>
                </div>
                <div className="contact-item">
                  <h3 className="text-xl font-semibold">Address</h3>
                  <p>Gamexso Games Private Limited</p>
                  <p>C/O Brijbhan Yadav floor  1st Bhadi Shahganj Jaunpur Utter Pradesh 223101  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="name" className="block text-lg font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="block text-lg font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="message" className="block text-lg font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md"
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md mt-4 hover:bg-blue-700 transition">Send Message</button>
              </form>
            </div>
          </div>
        </div>
        <Footer/>
      </main>
     
    </>
  );
};

export default Contact;
