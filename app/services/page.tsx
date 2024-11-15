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
export default function Home() {
  return (
    <>
    <Navbar/>
    <main className="bg-black text-white">
      <ServicesPage/>
      <Footer/>
    </main>
    </>
  );
}
