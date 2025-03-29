"use client";
import { upload } from '@vercel/blob/client';
import React, { useEffect, useRef, useState } from 'react';
interface CmsData {
  id: number;
  title: string;
  content: string; // HTML content field
  image: string; // Image URL
}

const Services: React.FC = () => {
  const [cmsData, setCmsData] = useState<CmsData[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentServiceId, setCurrentServiceId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null as File | null,
    imagePreview: "",
  });
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch("/api/services/");
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setCmsData(data);
      } catch (error) {
        console.error("Error fetching CMS data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCmsData();
  }, []);

  const openModal = (service?: CmsData) => {
    if (service) {
      setIsEditing(true);
      setCurrentServiceId(service.id);
      setFormData({
        title: service.title,
        content: service.content,
        image: null,
        imagePreview: service.image,
      });
    } else {
      setIsEditing(false);
      setCurrentServiceId(null);
      setFormData({ title: "", content: "", image: null, imagePreview: "" });
    }
    setIsModalOpen(true);
    setError("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
    setFormData({ title: "", content: "", image: null, imagePreview: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = async () => {
    if (!fileInputRef.current?.files) {
      throw new Error('No file selected');
    }
    // setPhotoUpoading(true);
    const file = fileInputRef.current.files[0];

    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/uploads',
      });
      // setPhotoUpoading(false);
      const imageUrl = newBlob.url;
      console.log(imageUrl);
      setFormData((prevData) => ({
                ...prevData,
               image: file,
                 imagePreview:imageUrl,
                }));

    } catch (error) {
      // setPhotoUpoading(false);
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.title || !formData.content || (!formData.image && !isEditing)) {
      setError("Please provide title, content, and a PNG image.");
      return;
    }
  
    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    if (formData.image) {
      form.append('image', formData.imagePreview);
    }
    if (isEditing && currentServiceId) {
      form.append("id", currentServiceId.toString());
    }
  
    try {
      const response = await fetch(`/api/services`, {
        method: isEditing ? "PUT" : "POST",
        body: form,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit service");
      }
  
      const updatedService = await response.json();
      if (isEditing) {
        setCmsData((prevData) =>
          prevData.map((item) => (item.id === currentServiceId ? updatedService : item))
        );
        alert("Service updated successfully!");
      } else {
        setCmsData((prevData) => [updatedService, ...prevData]);
        alert("Service added successfully!");
      }
      closeModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit service.");
    }
  };
  

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`/api/services/delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) throw new Error("Failed to delete the item");

        setCmsData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting CMS data:", error);
      }
    }
  };

  return (
    <div className="p-5">
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        onClick={() => openModal()}
      >
        Add Service
      </button>
      <h1 className="text-2xl font-bold mb-4">Services List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">ID</th>
              <th className="border border-gray-300 p-2 text-left">Image</th>
              <th className="border border-gray-300 p-2 text-left">Title</th>
              <th className="border border-gray-300 p-2 text-left">Details</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="border border-gray-300 p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              cmsData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{item.id}</td>
                  <td className="border border-gray-300 p-2">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="border border-gray-300 p-2">{item.title}</td>
                  <td className="border border-gray-300 p-2">{item.content.slice(0, 50)}...</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                      onClick={() => openModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Service" : "Add Service"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Details</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded"
                  rows={5}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Upload Image</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="mt-1 block w-full"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {formData.imagePreview && <img src={formData.imagePreview} alt="Preview" className="mt-2" />}
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                Submit
              </button>
            </form>
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded w-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
