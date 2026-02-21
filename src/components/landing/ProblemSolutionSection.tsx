import { motion } from "framer-motion";
import { MessageSquareWarning, Clock, BrainCircuit, ArrowRight, CheckCircle2 } from "lucide-react";

const problems = [
  {
    icon: MessageSquareWarning,
    title: "Cliente ansioso",
    desc: "Não entende termos jurídicos e fica perdido sobre o andamento do processo.",
  },
  {
    icon: Clock,
    title: "Bombardeio de mensagens",
    desc: "Ligações e mensagens constantes pedindo explicações que consomem horas do advogado.",
  },
  {
    icon: BrainCircuit,
    title: "Perda de produtividade",
    desc: "Advogado gasta tempo precioso com explicações repetitivas em vez de atuar nos casos.",
  },
];

const solutions = [
  "Traduz automaticamente termos difíceis",
  "Mostra o progresso visual do processo",
  "Notifica o cliente sobre atualizações",
  "Reduz perguntas em até 70%",
];

const ProblemSolutionSection = () => {
  return (
    <section id="como-funciona" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">O Problema</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            O Judiciário fala uma língua que{" "}
            <span className="text-gradient-primary">poucos entendem</span>
          </h2>
        </motion.div>

        {/* Problems */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-surface p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex justify-center mb-16">
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-primary rotate-90" />
          </div>
        </div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-surface p-8 md:p-12 glow-primary"
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-widest">A Solução</span>
          <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-8">
            Jusclient transforma a comunicação jurídica
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {solutions.map((s) => (
              <div key={s} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground border-t border-border pt-6">
            <strong className="text-foreground">Resultado:</strong> Menos perguntas, mais tempo livre para o advogado trabalhar em casos que realmente precisam de atenção jurídica.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
