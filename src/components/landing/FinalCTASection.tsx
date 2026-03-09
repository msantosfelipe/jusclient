import { motion } from "framer-motion";
import bgCta from "@/assets/bg-cta.jpg";

interface FinalCTASectionProps {
  onOpenModal: () => void;
}

const FinalCTASection = ({ onOpenModal }: FinalCTASectionProps) => {
  return (
    <section className="section-bg-image py-24 px-4">
      <img src={bgCta} alt="" className="section-bg-img" />
      <div className="section-bg-overlay" style={{ background: "hsl(var(--background) / 0.82)" }} />

      <div className="section-content max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ainda com dúvidas?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Veja na prática como o JusClient pode transformar a comunicação com seus clientes ainda hoje.
          </p>
          <button onClick={onOpenModal} className="btn-primary-glow">
            Começar Demonstração Gratuita →
          </button>
          <p className="text-muted-foreground text-xs mt-4">
            Sem cartão de crédito • Demonstração de 30 minutos • Suporte completo
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
