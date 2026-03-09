import { motion } from "framer-motion";

const SocialProofSection = () => {
  const videoPlaceholders = ["Depoimento - Advogado 1", "Depoimento - Advogado 2", "Depoimento - Advogado 3"];
  const whatsappFeedbacks = [
    { name: "Dr. Carlos", msg: "O JusClient mudou completamente a forma como me comunico com meus clientes. Reduziu 80% das ligações!" },
    { name: "Dra. Fernanda", msg: "Meus clientes adoraram! Agora eles acompanham tudo pelo app e não me ligam mais para perguntar sobre prazos." },
    { name: "Dr. Rafael", msg: "Implementei no meu escritório há 2 meses e já percebi uma diferença absurda na produtividade da equipe." },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
          Quem usa, <span className="gradient-text-gold">recomenda</span>
        </h2>
        <p className="text-muted-foreground mb-14 max-w-lg mx-auto">Veja o que advogados estão dizendo sobre o JusClient</p>

        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {videoPlaceholders.map((title, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="aspect-[9/16] rounded-2xl border border-border flex items-center justify-center cursor-pointer" style={{ background: "hsl(var(--surface-elevated))" }}>
              <div className="text-center p-4">
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center border-2"
                  style={{ borderColor: "hsl(var(--gold) / 0.3)", background: "hsl(var(--gold) / 0.08)" }}>
                  <svg className="w-6 h-6 ml-0.5" style={{ color: "hsl(var(--gold))" }} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <p className="text-sm text-muted-foreground">{title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {whatsappFeedbacks.map((fb, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card-feature text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "hsl(var(--green-accent) / 0.15)", color: "hsl(var(--green-accent))" }}>
                  {fb.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{fb.name}</p>
                  <p className="text-xs text-muted-foreground">via WhatsApp</p>
                </div>
              </div>
              <div className="rounded-xl p-4 text-sm" style={{ background: "hsl(var(--green-accent) / 0.06)", borderLeft: "3px solid hsl(var(--green-accent) / 0.4)" }}>
                "{fb.msg}"
              </div>
            </motion.div>
          ))}
        </div>
        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default SocialProofSection;
