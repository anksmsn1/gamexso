"use client";
import React, { useEffect, useState } from 'react';



const Cms: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [heroImageBase64, setHeroImageBase64] = useState<string | null>(null); // Store Base64 string
  const [position, setPosition] = useState<number>(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Loader state
 

  const validateForm = () => {
    const newErrors: string[] = [];

    if (title.length < 5 || title.length > 100) {
      newErrors.push("Title must be between 5 and 100 characters.");
    }

    if (!content || content.trim().length < 20) {
      newErrors.push("Content must be at least 20 characters long.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setHeroImageBase64(reader.result as string); // Set Base64 string
      };

      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true); // Start loader

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('position', position.toString());

    if (heroImageBase64) {
      formData.append('heroImage', heroImageBase64); // Append Base64 string
    }

    try {
      const response = await fetch('/api/cms', {
        method: 'POST',
        body: formData, // Send FormData directly
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Post created successfully:', result);
      setTitle('');
      setContent('');
      setHeroImageBase64(null);
      setPosition(1);
       
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false); // Stop loader
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="mb-5 text-red-600">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-5">
          <label htmlFor="title" className="block mb-2">Page Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={5}
            maxLength={100}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex mb-5 gap-4">
          <div className="flex-1">
            <label htmlFor="heroImage" className="block mb-2">Upload Hero Image</label>
            <input
              type="file"
              id="heroImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="position" className="block mb-2">Select Position (1-10)</label>
            <select
              id="position"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label htmlFor="content" className="block mb-2">Page Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          
          }}
          rows={5}
          required
          minLength={20}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-5 px-4 py-2 rounded cursor-pointer ${
            isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 text-white"
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        {isSubmitting && (
          <div className="mt-3 text-blue-600">Submitting your post, please wait...</div>
        )}
      </form>
    </div>
  );
};

export default Cms;