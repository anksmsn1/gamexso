"use client";
import { upload } from '@vercel/blob/client';
import React, { useEffect, useRef, useState } from 'react';

interface CmsData {
  id: number;
 
  image: string; // New column for image URL
}

const Banners: React.FC = () => {
  const [cmsData, setCmsData] = useState<CmsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof CmsData; direction: 'ascending' | 'descending' }>({
    key: 'id',
    direction: 'ascending',
  });
  const [modalContent, setModalContent] = useState<string>(''); // State to store content for the modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal visibility
  const [formData, setFormData] = useState({
    title: '',
    image: null as File | null,
    imagePreview: '' // Base64 image preview
  });
  const [error, setError] = useState<string>(''); // To handle validation errors

  // Fetch data when component mounts
  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch('/api/banners/'); // Replace with your API endpoint
        const data = await response.json();
        setCmsData(data);
      } catch (error) {
        console.error('Error fetching CMS data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCmsData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/banners/delete`, {
          method: 'POST', // Change to POST
          headers: {
            'Content-Type': 'application/json', // Set content type for JSON request
          },
          body: JSON.stringify({ id }), // Pass the id in the request body
        });

        if (response.ok) {
          setCmsData(cmsData.filter(item => item.id !== id)); // Remove item from state after successful deletion
        } else {
          console.error('Failed to delete the item');
        }
      } catch (error) {
        console.error('Error deleting CMS data:', error);
      }
    }
  };

  const sortData = (key: keyof CmsData) => {
    const direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });

    const sortedData = [...cmsData].sort((a, b) => {
      if (a[key] < b[key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setCmsData(sortedData);
  };

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
    setError(''); // Clear error
    setFormData({ title: '', image: null, imagePreview: '' }); // Reset form data
  };

  const handleAddFeatureClick = () => {
    setModalContent('Add New Banner');
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
    if (!formData.imagePreview) {
      setError('Please Upload an image.');
      return;
    }
  
    // Prepare the form data for submission
    const form = new FormData();
   
    form.append('image', formData.imagePreview);
  
    try {
      const response = await fetch('/api/banners', {
        method: 'POST',
        body: form, // Send form data including image
      });
  
      if (response.ok) {
        alert('Banner added successfully!');
        const newFeature = await response.json(); // Assuming the server returns the newly created feature
      
        // Add the new feature to the top of the list
        setCmsData((prevData) => [newFeature, ...prevData]);
        closeModal(); // Close the modal on success
      } else {
        alert('Failed to add Banner');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="p-5">
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        onClick={handleAddFeatureClick} // Trigger modal on click
      >
        Add Banner
      </button>
      <h1 className="text-2xl font-bold mb-4 mt-5">Banners List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th
                className="border border-gray-300 p-2 text-left cursor-pointer"
                onClick={() => sortData('id')}
              >
                ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th className="border border-gray-300 p-2 text-left">Image</th>
              
             
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="border border-gray-300 p-4 text-center">
                  <div className="animate-spin border-t-4 border-blue-500 rounded-full w-8 h-8 mx-auto"></div>
                </td>
              </tr>
            ) : (
                cmsData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-2">{item.id}</td>
                      <td className="border border-gray-300 p-2">
                        <img src={item.image} alt={item.image} className="w-16 h-16 object-cover rounded" />
                      </td>
                      
                      <td className="border border-gray-300 p-2">
                        <div className="flex space-x-2">
                          
                          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 flex items-center" onClick={() => handleDelete(item.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
            )}
          </tbody>
        </table>
      </div>

      {/* Tailwind Modal with Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Banner</h2>

            <form onSubmit={handleSubmit}>
              

              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload PNG Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {formData.imagePreview && (
                  <img src={formData.imagePreview} alt="Preview" className="mt-4 max-h-40 object-contain" />
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full"
              >
                Submit
              </button>
            </form>

            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 w-full"
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

export default Banners;
