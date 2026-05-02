import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";
import About from "../components/About";
import News from "../components/News";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Products />
        <About />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
