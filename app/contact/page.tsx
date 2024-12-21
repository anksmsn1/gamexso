"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Define a type for the form data
interface FormData {
  
  contactPerson: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
   
    contactPerson: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // Response message state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Show loader
    setResponseMessage(null); // Clear any previous response message

    try {
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage("Thanks for your interest. One of our executive will contact you soon!");
        setFormData({
          contactPerson: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        setResponseMessage(`Error: ${errorData.error || "Failed to send the message."}`);
      }
    } catch (error) {
      setResponseMessage("An error occurred while sending the message. Please try again.");
    } finally {
      setIsLoading(false); // Hide loader
    }
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
                  <p>
                    <a href="tel:+919161610042">+91-9161610042</a>
                  </p>
                </div>
                <div className="contact-item">
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p>support@gamexso.com</p>
                </div>
                <div className="contact-item">
                  <h3 className="text-xl font-semibold">Address</h3>
                  <p>Gamexso Games Private Limited</p>
                  <p>C/O Brijbhan Yadav, 1st Floor, Bhadi Shahganj, Jaunpur, Uttar Pradesh, 223101</p>
                </div>
              </div>
            </div>

           
            <div className="contact-form">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              {responseMessage && (
                <p className={`mt-4 text-center ${responseMessage.startsWith("Error") ? "text-red-500" : "text-green-500"}`}>
                  {responseMessage}
                </p>
              )}
              <form onSubmit={handleSubmit}>
                
                <div className="form-group mb-4">
                  <label htmlFor="contactPerson" className="block text-lg font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
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
                  <label htmlFor="phone" className="block text-lg font-medium mb-2">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-md mt-4 hover:bg-blue-700 transition disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
             
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Contact;
