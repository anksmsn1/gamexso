import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Features from './components/Features';
import Games from './components/Games';
import StylishHr from "./components/StylishHr";
import OurPartners from './components/OurPartners';
import Disclaimer from './components/Disclaimer';
import Testimonials from './components/Testimonials';
import DownloadGameBanner from './components/DownloadGameBanner';
import Footer from './components/Footer';
export default function Home() {
  return (
    <>
    <Navbar/>
    <main className="bg-black text-white">
      <Layout />
      <StylishHr variant="iconDivider" />

      <Features/>
      <StylishHr variant="iconDivider" />

      <Games/>

      <StylishHr variant="iconDivider" />
      <OurPartners/>
      <StylishHr variant="iconDivider" />
      <Disclaimer />
      <StylishHr variant="iconDivider" />
      <Testimonials />
      <DownloadGameBanner/>
      <Footer/>
    </main>
    </>
  );
}
