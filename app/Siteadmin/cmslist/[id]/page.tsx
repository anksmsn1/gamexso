"use client"
import React, { useEffect, useRef, useState } from 'react';
import Editor from '../../../components/Editor';
import { OutputData } from '@editorjs/editorjs';
import { upload } from '@vercel/blob/client';
const Cms: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>(''); // Content from the editor
  const [heroImageBase64, setHeroImageBase64] = useState<string | null>(null);
  const [linkPosition, setLinkPosition] = useState<string>('');
  const [position, setPosition] = useState<number>(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fetchData = async (fetchedId: string) => {
    try {
      const response = await fetch('/api/cms/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: fetchedId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CMS details');
      }

      const result = await response.json();
 
      setTitle(result.cmsData[0].title);
      setContent(result.cmsData[0].content); // Assuming content is in plain string or HTML
      setPosition(result.cmsData[0].position);
      setLinkPosition(result.cmsData[0].linkposition);
      if (result.cmsData[0].heroImage) {
        setHeroImageBase64(result.cmsData[0].heroImage); // Use actual image base64 or URL
      }
    } catch (error) {
      console.error('Error fetching CMS details:', error);
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (title.length < 3 || title.length > 100) {
      newErrors.push("Title must be between 3 and 100 characters.");
    }

    if (!content || content.trim().length < 20) {
      newErrors.push("Content must be at least 20 characters long.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
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
      setHeroImageBase64(imageUrl);

    } catch (error) {
      // setPhotoUpoading(false);
      console.error('Error uploading file:', error);
    }
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setHeroImageBase64(reader.result as string);
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('id', id || '');
    formData.append('title', title);
    formData.append('content', content); // Content from the editor
    formData.append('position', position.toString());
    formData.append('linkPosition',linkPosition);

    if (heroImageBase64) {
      formData.append('heroImage', heroImageBase64);
    }

    try {
      const response = await fetch('/api/cms', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Post created successfully:', result);
      window.location.href = "/Siteadmin/cmslist";
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const fetchedId = pathParts[pathParts.length - 1];
    setId(fetchedId);

    if (fetchedId) {
      fetchData(fetchedId);
    }
  }, []);

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
          <label htmlFor="title" className="block mb-2">
            Page Title
          </label>
          <input
            type="text"
            id="title"
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={5}
            maxLength={100}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="hidden"
            id="id"
            defaultValue={id || ''}
            minLength={5}
            maxLength={100}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex mb-5 gap-4">
          <div className="flex-1">
            <label htmlFor="heroImage" className="block mb-2">
              Upload Hero Image  
            </label>
            <input
              type="file"
              id="heroImage"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {heroImageBase64 && <img src={heroImageBase64} width={200} height={200} />}
          </div>

          <div className="flex-1">
            <label htmlFor="position" className="block mb-2">
              Select Position (1-10)
            </label>
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
          <div className="flex-1">
            <label htmlFor="linkPosition" className="block mb-2">Link Position</label>
            <select
              id="linkPosition"
              value={linkPosition}
              onChange={(e) => setLinkPosition(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
             
                <option  value="Main Menu">Main Menu</option>
              
                <option  value="Footer">Footer</option>
              
            </select>
          </div>
        </div>

        <label htmlFor="content" className="block mb-2">
          Page Content
        </label>
        <Editor value={content} onChange={setContent} /> {/* No ref prop passed */}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-5 px-4 py-2 rounded cursor-pointer ${
            isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Update'}
        </button>

        {isSubmitting && (
          <div className="mt-3 text-blue-600">Submitting your post, please wait...</div>
        )}
      </form>
    </div>
  );
};

export default Cms;
