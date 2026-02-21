import { motion } from "framer-motion";
import { Users, UserPlus, TrendingUp, BadgeCheck } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Advogado adota", desc: "Advogado se cadastra e conecta seus processos ao Jusclient." },
  { icon: Users, title: "Clientes experimentam", desc: "Cada advogado conecta dezenas de clientes que passam a usar a plataforma." },
  { icon: TrendingUp, title: "Rede se expande", desc: "Mais advogados usam, mais clientes conhecem, mais indicações surgem." },
];

const NetworkEffectSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Efeito de Rede</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Quanto mais usam, mais <span className="text-gradient-secondary">valor</span> é gerado
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="card-surface p-6 text-center relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-border" />
              )}
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Badge highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-surface p-8 flex flex-col md:flex-row items-center gap-6 glow-secondary"
        >
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0">
            <BadgeCheck className="w-8 h-8 text-secondary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Selo de Comunicação Transparente</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Advogados que usam o Jusclient recebem um selo digital de "Comunicação Transparente" para exibir em redes sociais e sites profissionais, demonstrando compromisso com a clareza e confiança.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NetworkEffectSection;
