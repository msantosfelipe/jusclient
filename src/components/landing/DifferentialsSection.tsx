import { motion } from "framer-motion";

const translations = [
  { juridiques: '"Sentença proferida"', traducao: '"O juiz já deu a decisão sobre seu caso. Seu advogado vai te explicar o resultado em breve."' },
  { juridiques: '"Recurso interposto"', traducao: '"O advogado entrou com um recurso para pedir que outro juiz revise a decisão."' },
  { juridiques: '"Despacho de mero expediente"', traducao: '"Foi feita uma movimentação simples no processo, sem decisão importante ainda."' },
  { juridiques: '"Conclusão ao juiz para sentença"', traducao: '"O processo foi enviado para o juiz tomar a decisão final. Agora é aguardar!"' },
];

const phases = [
  { name: "Início do Processo", range: "0-25%", desc: "Processo em andamento inicial", value: 15, color: "hsl(var(--gold))" },
  { name: "Audiências e Análises", range: "25-75%", desc: "Fase de instrução e apresentação de provas", value: 50, color: "hsl(var(--gold))" },
  { name: "Decisão Final", range: "75-100%", desc: "Fase final / decisão / execução", value: 90, color: "hsl(var(--gold))" },
];

const DifferentialsSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            O cliente finalmente entende o que está acontecendo
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12">
            Nosso modelo de linguagem traduz o juridiquês para português claro e simples
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {translations.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="card-feature text-left">
                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md mb-3" style={{ color: "hsl(var(--red-accent))", background: "hsl(var(--red-accent) / 0.12)" }}>Juridiquês</span>
                <p className="text-muted-foreground text-sm mb-4">{t.juridiques}</p>
                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md mb-3" style={{ color: "hsl(var(--green-accent))", background: "hsl(var(--green-accent) / 0.12)" }}>Tradução Jusclient</span>
                <p className="text-sm font-medium">{t.traducao}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-surface p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-extrabold text-center mb-3">Indicador Visual de Fase Processual</h3>
          <p className="text-muted-foreground text-center mb-10">Cliente sabe exatamente em que etapa está o processo</p>
          <div className="space-y-8">
            {phases.map((p, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-bold">{p.name}</h4>
                    <p className="text-xs text-muted-foreground">{p.range} • {p.desc}</p>
                  </div>
                  <span className="text-sm font-bold rounded-full px-3 py-1" style={{ background: "hsl(var(--surface-elevated))", color: "hsl(var(--gold))" }}>{p.value}%</span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.value}%` }} viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                    className="h-full rounded-full" style={{ background: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default DifferentialsSection;
