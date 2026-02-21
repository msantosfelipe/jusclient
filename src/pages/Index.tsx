import HeroSection from "@/components/landing/HeroSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import TranslatorSection from "@/components/landing/TranslatorSection";
import NetworkEffectSection from "@/components/landing/NetworkEffectSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSolutionSection />
      <TranslatorSection />
      <NetworkEffectSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
