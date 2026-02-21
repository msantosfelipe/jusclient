import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Plan {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  highlighted: boolean;
  comingSoon: boolean;
}

const plans: Plan[] = [
  {
    name: "Solo",
    price: "R$ 127",
    period: "/mês",
    desc: "Advogado autônomo",
    features: [
      "30 processos ativos",
      "Painel do advogado completo",
      "App do cliente ilimitado",
      "Integração com PJe",
      "Tradução jurídica automática",
      "Chat e documentos",
    ],
    highlighted: true,
    comingSoon: false,
  },
  {
    name: "Escritório",
    price: "R$ 397",
    period: "/mês",
    desc: "Pequeno e médio porte",
    features: [
      "Até 5 advogados",
      "200 processos ativos",
      "Gestão centralizada de equipe",
      "Suporte prioritário",
      "Templates de comunicação",
    ],
    highlighted: false,
    comingSoon: true,
  },
  {
    name: "Enterprise",
    price: "R$ 1.497",
    period: "/mês",
    desc: "Grandes escritórios",
    features: [
      "Até 20 advogados",
      "1.000 processos ativos",
      "API disponível",
      "Dashboard executivo",
      "Suporte dedicado",
    ],
    highlighted: false,
    comingSoon: true,
  },
  {
    name: "Institucional",
    price: "R$ 24.000",
    period: "/ano",
    desc: "Órgãos públicos",
    features: [
      "Usuários e processos ilimitados",
      "Customizações exclusivas",
      "SLA contratual",
      "Implantação assistida",
      "Treinamento incluso",
    ],
    highlighted: false,
    comingSoon: true,
  },
];

const PricingSection = () => {
  return (
    <section className="py-24 px-4 bg-surface" id="precos">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Planos</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Planos que crescem com seu <span className="text-gradient-primary">escritório</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-xl border p-6 flex flex-col transition-all ${
                plan.highlighted
                  ? "bg-card border-primary/40 glow-primary"
                  : "bg-card border-border"
              } ${plan.comingSoon ? "opacity-60" : ""}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Disponível
                  </span>
                </div>
              )}
              {plan.comingSoon && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Em Breve
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold mt-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>

              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              {plan.highlighted ? (
                <Link to="/cadastro">
                  <Button variant="hero" className="w-full">Começar Agora</Button>
                </Link>
              ) : (
                <Button variant="hero-outline" className="w-full" disabled={plan.comingSoon}>
                  {plan.comingSoon ? "Em Breve" : "Escolher Plano"}
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
