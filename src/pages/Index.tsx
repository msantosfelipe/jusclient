import HeroSection from "@/components/landing/HeroSection";
import LeadModal from "@/components/landing/LeadModal";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import IntermediateCTA from "@/components/landing/IntermediateCTA";
import DifferentialsSection from "@/components/landing/DifferentialsSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/landing/Footer";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import { useState } from "react";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <HeroSection onOpenModal={() => setModalOpen(true)} />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <FeaturesSection />
      <IntermediateCTA onOpenModal={() => setModalOpen(true)} />
      <DifferentialsSection />
      <SocialProofSection />
      <FAQSection />
      <FinalCTASection onOpenModal={() => setModalOpen(true)} />
      <Footer />
      {/* <WhatsAppFloat /> */}
      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;