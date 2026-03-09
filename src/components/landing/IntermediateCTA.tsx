import { motion } from "framer-motion";
import bgCta from "@/assets/bg-cta.jpg";

interface IntermediateCTAProps {
  onOpenModal: () => void;
}

const IntermediateCTA = ({ onOpenModal }: IntermediateCTAProps) => {
  return (
    <section className="section-bg-image py-20 px-4">
      <img src={bgCta} alt="" className="section-bg-img" />
      <div className="section-bg-overlay" style={{ background: "hsl(var(--background) / 0.82)" }} />

      <div className="section-content max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
            Pronto para revolucionar seu escritório?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Junte-se aos advogados que já economizam horas toda semana e oferecem a melhor experiência para seus clientes
          </p>
          <button onClick={onOpenModal} className="btn-primary-glow">
            Solicitar Demonstração Gratuita →
          </button>
          <p className="text-muted-foreground text-xs mt-4">
            Sem cartão de crédito • Demonstração de 30 minutos • Suporte completo
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IntermediateCTA;
