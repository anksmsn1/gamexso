"use client";
import React, { useEffect, useState } from 'react';

interface CmsData {
  id: number;
  title: string;
  content: string; // HTML content field
  heroImage: string; // New column for image URL
}

const Cmslist: React.FC = () => {
  const [cmsData, setCmsData] = useState<CmsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortConfig, setSortConfig] = useState<{ key: keyof CmsData; direction: 'ascending' | 'descending' }>({
    key: 'id',
    direction: 'ascending',
  });
  const [modalContent, setModalContent] = useState<string>(''); // State to store content for the modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal visibility

  // Fetch data when component mounts
  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch('/api/cms/'); // Replace with your API endpoint
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
        const response = await fetch(`/api/cms/delete`, {
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
  };

  return (
    <div className="p-5">
      <a className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" href="cms">
        Add Page
      </a>
      <h1 className="text-2xl font-bold mb-4 mt-5">CMS Data</h1>
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
              <th
                className="border border-gray-300 p-2 text-left cursor-pointer"
                onClick={() => sortData('title')}
              >
                Title {sortConfig.key === 'title' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="border border-gray-300 p-2 text-left cursor-pointer"
                onClick={() => sortData('content')}
              >
                Content {sortConfig.key === 'content' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
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
                    <img src={item.heroImage} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="border border-gray-300 p-2">{item.title}</td>
                  <td className="border border-gray-300 p-2">
                    <div dangerouslySetInnerHTML={{ __html: item.content.slice(0, 100) }} /> {/* Display the first 100 characters of content */}
                    {item.content.length > 100 && (
                      <button
                        className="text-blue-500 hover:text-blue-700 ml-2"
                        onClick={() => openModal(item.content)}
                      >
                        Read More
                      </button>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex space-x-2">
                      <a  href={`cmslist/${item.id}`} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 flex items-center">
                        Edit
                      </a>
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

      {/* Modal for displaying full content */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Content</h2>
            <div dangerouslySetInnerHTML={{ __html: modalContent }} />
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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

export default Cmslist;
