// app/components/Pages.tsx

"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { useParams } from "next/navigation";
// Define the structure of the data expected from the API
interface AboutData {
  mission: string;
  story: string;
  // Add more fields as necessary based on API response
}

interface AboutUsProps {
  slug: string;
}


export default function Pages() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();
  useEffect(() => {
    console.log("Slug:", slug); // For debugging purposes
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/pages/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: AboutData = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#000", color: "#f0f0f0" }}>
        {/* Hero Section */}
        <section
          style={{
            backgroundImage: "url('/path-to-hero-image.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            padding: "150px 20px",
            textAlign: "center",
            color: "#f0f0f0",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          ></div>
          <h1 style={{ position: "relative", fontSize: "3rem", zIndex: 1 }}>
            About Us
          </h1>
          <p style={{ position: "relative", fontSize: "1.25rem", zIndex: 1 }}>
            Crafting fits that inspire confidence and comfort.
          </p>
        </section>

        {/* Additional Content from API */}
        {data && (
          <section style={{ padding: "20px" }}>
            <h2>Our Mission</h2>
            <p>{data.mission}</p>

            <h2>Our Story</h2>
            <p>{data.story}</p>

            {/* Render more sections based on data as needed */}
          </section>
        )}
      </div>
    </>
  );
}
