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
      <section className="py-16 bg-black">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">{data?.title}</h2>
       
        <div className="w-[80%] mx-auto py-10 text-white text-left">
        {data && (
        
         <div 
           dangerouslySetInnerHTML={{
             __html: data.content || "",
           }}
         ></div>
       
       
        )}
        </div>
      </div>
    </section>
     
      <Footer/>
    </>
  );
}
