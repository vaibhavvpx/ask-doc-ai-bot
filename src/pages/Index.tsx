import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import SetupGuide from "@/components/SetupGuide";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ArchitectureSection />
        <SetupGuide />
        <DemoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
