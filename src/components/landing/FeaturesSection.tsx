import { motion } from "framer-motion";
import { Clock, Bell, MessageCircle, FileText, Star, Shield } from "lucide-react";
import bgFeatures from "@/assets/bg-features.jpg";

const features = [
  { icon: Clock, title: "Acompanhamento em Tempo Real", desc: "Cliente visualiza cada movimentação do processo no momento em que acontece, sem precisar ligar.", color: "hsl(var(--purple-accent))" },
  { icon: Bell, title: "Notificações Inteligentes", desc: "Alertas automáticos quando há movimentação no processo. Cliente sempre informado.", color: "hsl(var(--gold))" },
  { icon: MessageCircle, title: "Chat Integrado", desc: "Comunicação organizada dentro do app. Sem mais WhatsApp pessoal misturado.", color: "hsl(var(--green-accent))" },
  { icon: FileText, title: "Envio de Documentos", desc: "Cliente envia documentos diretamente pelo app. Tudo organizado por processo.", color: "hsl(var(--purple-accent))" },
  { icon: Star, title: "Sistema de Avaliação", desc: "Construa sua reputação com avaliações reais de clientes satisfeitos.", color: "hsl(var(--gold))" },
  { icon: Shield, title: "Controle Total", desc: "Advogado com autonomia completa para gerenciar processos e informações.", color: "hsl(var(--red-accent))" },
];

const FeaturesSection = () => {
  return (
    <section className="section-bg-image py-24 px-4">
      <img src={bgFeatures} alt="" className="section-bg-img" />
      <div className="section-bg-overlay" />

      <div className="section-content max-w-6xl mx-auto text-center">
        <span className="section-badge mb-6 inline-block" style={{ color: "hsl(var(--green-accent))", borderColor: "hsl(var(--green-accent) / 0.3)", background: "hsl(var(--green-accent) / 0.1)" }}>
          Funcionalidades
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
          Tudo que você precisa em um só lugar
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-14">
          Desenvolvido para economizar seu tempo e melhorar a experiência do seu cliente
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="card-feature text-left">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${f.color}12` }}>
                <f.icon size={24} style={{ color: f.color }} />
              </div>
              <h4 className="font-bold text-lg mb-2">{f.title}</h4>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default FeaturesSection;
