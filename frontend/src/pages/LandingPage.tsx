import Navbar from "../components/Navbar";
import HomeSection from "../components/HomeSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
