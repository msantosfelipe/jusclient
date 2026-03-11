import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import bgSolution from "@/assets/bg-solution.jpg";

const points = [
  "Traduz automaticamente termos difíceis",
  "Mostra o progresso visual do processo",
  "Notifica o cliente sobre atualizações",
  "Reduz perguntas em até 70%",
];

const SolutionSection = () => {
  return (
    <section className="section-bg-image py-24 px-4">
      <img src={bgSolution} alt="" className="section-bg-img" />
      <div className="section-bg-overlay" />

      <div className="section-content max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-surface p-8 md:p-12"
        >
          <span className="text-m font-bold tracking-widest uppercase gradient-text-gold mb-4 inline-block">
            A Solução
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
            Jusclient transforma a comunicação jurídica
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {points.map((point, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "hsl(var(--gold) / 0.04)" }}>
                <CheckCircle2 size={20} className="shrink-0" style={{ color: "hsl(var(--gold))" }} />
                <span className="text-muted-foreground text-sm">{point}</span>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Resultado:</strong> Menos perguntas, mais tempo livre para o advogado trabalhar em casos que realmente precisam de atenção jurídica.
            </p>
          </div>
        </motion.div>
        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default SolutionSection;
