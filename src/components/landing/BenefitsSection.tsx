import { motion } from "framer-motion";
import { Clock, TrendingUp, Users, Zap } from "lucide-react";

const benefits = [
  { icon: Clock, title: "Economize até 10 horas por semana", desc: "Pare de explicar as mesmas coisas repetidamente" },
  { icon: TrendingUp, title: "Aumente sua reputação", desc: "Sistema de avaliações gera confiança e atrai novos clientes" },
  { icon: Users, title: "Atenda mais clientes", desc: "Com processos otimizados, você pode crescer seu escritório" },
  { icon: Zap, title: "Gestão simplificada", desc: "Todos os processos organizados em um único painel" },
];

const stats = [
  { label: "Ligações recebidas/semana", value: "-87%", color: "hsl(var(--red-accent))" },
  { label: "Satisfação do cliente", value: "+156%", color: "hsl(var(--green-accent))" },
  { label: "Tempo economizado", value: "10h+", color: "hsl(var(--gold))" },
  { label: "Novos clientes", value: "+42%", color: "hsl(var(--green-accent))" },
];

const BenefitsSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-10">
              Mais tempo para o que realmente importa
            </h2>
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "hsl(var(--surface-elevated) / 0.5)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "hsl(var(--primary) / 0.12)" }}>
                    <b.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-0.5">{b.title}</h4>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass-surface p-1 rounded-2xl">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-6 border-b border-border last:border-0">
                <span className="text-muted-foreground text-sm">{s.label}</span>
                <span className="stat-value" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default BenefitsSection;
