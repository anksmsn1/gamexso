"use client"
import Footer from "@/app/components/Footer";
import Loader from "@/app/components/Loader";
import Navbar from "@/app/components/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
interface AboutData {
  title: string;
  content: string;
  heroImage: string;
  // Add more fields as necessary based on API response
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
        const result = await response.json();
        console.log("API Response:", result);
        setData(result[0]);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#000", color: "#f0f0f0" }}>
        {/* Hero Section */}
        <section
          style={{
            backgroundImage: `url(${data?.heroImage || '/path-to-default-image.jpg'})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            padding: "100px 20px",
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
            {data?.title || ""}
          </h1>
          
        </section>

        {/* Additional Content from API */}
        {data && (
         <section className="w-[80%] mx-auto py-20">
         <div 
           dangerouslySetInnerHTML={{
             __html: data.content || "",
           }}
         ></div>
       
         {/* Render more sections based on data as needed */}
       </section>
        )}
      </div>
      <Footer/>
    </>
  );
}
