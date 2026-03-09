import HeroSection from "@/components/landing/HeroSection";
import LeadModal from "@/components/landing/LeadModal";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import TranslatorSection from "@/components/landing/TranslatorSection";
import NetworkEffectSection from "@/components/landing/NetworkEffectSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";
import { useState } from "react";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <HeroSection onOpenModal={() => setModalOpen(true)} />
      {/* <ProblemSection /> */}
      {/* <SolutionSection />
      <BenefitsSection />
      <FeaturesSection />
      <IntermediateCTA onOpenModal={() => setModalOpen(true)} />
      <DifferentialsSection />
      <SocialProofSection />
      <FAQSection />
      <FinalCTASection onOpenModal={() => setModalOpen(true)} />
      <Footer />
      <WhatsAppFloat /> */}
      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;