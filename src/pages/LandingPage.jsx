import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Subunit from "../components/Subunit";
import Community from "../components/Community";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Subunit />
      <Community />
      <Footer />
    </div>
  );
}
