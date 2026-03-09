import { motion } from "framer-motion";
import { X, MessageSquareWarning, Clock, TrendingDown } from "lucide-react";
import bgProblem from "@/assets/bg-problem.jpg";

const problems = [
  { icon: MessageSquareWarning, color: "hsl(var(--red-accent))", title: "Cliente ansioso", desc: "Não entende termos jurídicos e fica perdido sobre o andamento do processo." },
  { icon: Clock, color: "hsl(var(--red-accent))", title: "Bombardeio de mensagens", desc: "Ligações e mensagens constantes pedindo explicações que consomem horas do advogado." },
  { icon: TrendingDown, color: "hsl(var(--red-accent))", title: "Perda de produtividade", desc: "Advogado gasta tempo precioso com explicações repetitivas em vez de atuar nos casos." },
];

const questions = [
  '"Doutor, o que significa essa movimentação?"',
  '"Quanto tempo falta para terminar?"',
  '"Teve alguma novidade no meu processo?"',
  '"Não entendi nada do que está escrito aqui..."',
];

const ProblemSection = () => {
  return (
    <section className="section-bg-image py-24 px-4">
      <img src={bgProblem} alt="" className="section-bg-img" />
      <div className="section-bg-overlay" />

      <div className="section-content max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-8">
                Seu telefone não para de tocar
              </h2>
              <div className="space-y-4">
                {questions.map((q, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "hsl(var(--surface-elevated) / 0.5)" }}>
                    <X size={18} className="mt-1 shrink-0" style={{ color: "hsl(var(--red-accent))" }} />
                    <span className="text-muted-foreground">{q}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 rounded-xl p-5 border relative overflow-hidden" style={{ background: "hsl(var(--red-accent) / 0.06)", borderColor: "hsl(var(--red-accent) / 0.2)" }}>
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: "hsl(var(--red-accent))" }} />
                <p className="text-sm pl-3" style={{ color: "hsl(var(--red-accent))" }}>
                  <strong>Resultado:</strong> Horas perdidas explicando o mesmo processo várias vezes
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-2">
                O Judiciário fala uma língua que <span className="gradient-text-gold">poucos entendem</span>
              </h2>
              <div className="grid gap-4 mt-8">
                {problems.map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="card-feature flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${p.color}15` }}>
                      <p.icon size={22} style={{ color: p.color }} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{p.title}</h4>
                      <p className="text-sm text-muted-foreground">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default ProblemSection;
