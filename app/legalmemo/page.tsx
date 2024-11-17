import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import Games from '../components/Games';
import StylishHr from "../components/StylishHr";
import OurPartners from '../components/OurPartners';
import Disclaimer from '../components/Disclaimer';
import Testimonials from '../components/Testimonials';
import DownloadGameBanner from '../components/DownloadGameBanner';
import Footer from '../components/Footer';
import ServicesPage from '../components/Services';
import Image from 'next/image';
import Legalmemo from '../../public/legalmemo.jpeg';
import AboutUsImage from '../../public/about-us.jpg';
export default function Home() {
  return (
    <>
    <Navbar/>

    <main className="bg-black text-white">
      <section
          style={{
            backgroundImage: `url(${AboutUsImage.src})`,
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
            Legal Memo
          </h1>
          
        </section>
        <div className='flex items-center justify-center'>
        <Image  alt="Legal memo of Gamexso" src={Legalmemo} className='m-auto'/>
        </div>
      <Footer/>
    </main>
    </>
  );
}
