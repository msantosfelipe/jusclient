import { motion } from "framer-motion";
import bgHero from "@/assets/bg-hero.jpg";
import logo from "@/assets/logo_v1.png";

interface HeroSectionProps {
  onOpenModal: () => void;
}

const HeroSection = ({ onOpenModal }: HeroSectionProps) => {
  return (
    <>
      <header className="relative z-20 border-b border-white/10" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-4">
          <img src={logo} alt="Jusclient" className="h-10 w-auto md:h-12" />
        </div>
      </header>

      <section className="section-bg-image min-h-screen flex flex-col items-center justify-center px-4 pb-16 pt-10">
        <img src={bgHero} alt="" className="section-bg-img" />

        <div className="section-bg-overlay" style={{ background: "hsl(var(--background) / 0.85)" }} />

      <div className="section-content w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Seu cliente merece{" "}
            <span className="gradient-text-gold">entender</span>{" "}
            o próprio processo.
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Pare de responder as mesmas perguntas todos os dias. Com o Jusclient,
            seu cliente acompanha tudo em tempo real, em linguagem simples.
          </p>
        </motion.div>

        {/* VSL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-3xl mx-auto mb-10"
        >
          <div className="aspect-video rounded-2xl border border-border overflow-hidden" style={{ background: "hsl(var(--surface-elevated))" }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border-2"
                  style={{ borderColor: "hsl(var(--gold) / 0.4)", background: "hsl(var(--gold) / 0.1)" }}
                >
                  <svg className="w-8 h-8 ml-1" style={{ color: "hsl(var(--gold))" }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
                <p className="text-sm text-muted-foreground">Assista a apresentação</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <button onClick={onOpenModal} className="btn-primary-glow text-base md:text-lg">
            Fazer Teste Gratuito →
          </button>
          <p className="text-muted-foreground text-sm mt-4">
            Sem pagamento • Demonstração limitada de 30 minutos
          </p>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default HeroSection;
