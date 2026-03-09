import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import bgSolution from "@/assets/bg-solution.jpg";

const faqs = [
  { q: "O que é o JusClient?", a: "O JusClient é uma plataforma que facilita a comunicação entre advogados e clientes. Com ele, o cliente consegue acompanhar atualizações do processo, documentos e informações importantes em um único lugar." },
  { q: "Isso realmente reduz as mensagens no WhatsApp?", a: "Sim. Um dos principais benefícios do JusClient é reduzir as perguntas repetitivas dos clientes. Como eles conseguem acompanhar o andamento e atualizações do processo na plataforma, a necessidade de enviar mensagens para pedir informações diminui significativamente." },
  { q: "Meus clientes precisam ser bons com tecnologia para usar?", a: "Não. O JusClient foi desenvolvido para ser simples e intuitivo. Mesmo clientes com pouca familiaridade com tecnologia conseguem acessar facilmente as informações do processo." },
  { q: "Posso usar o JusClient sendo advogado autônomo?", a: "Sim. A plataforma funciona tanto para advogados autônomos quanto para escritórios de advocacia que desejam profissionalizar a comunicação com seus clientes." },
  { q: "O JusClient é seguro?", a: "Sim. A plataforma utiliza padrões modernos de segurança para proteger os dados dos advogados e de seus clientes." },
  { q: "Quanto tempo leva para começar a usar?", a: "A implementação é rápida. Após a demonstração, você já pode começar a utilizar o JusClient no seu escritório." },
  { q: "Posso testar antes de contratar?", a: "Sim. Você pode solicitar uma demonstração gratuita, onde mostramos como o JusClient funciona e como ele pode ser aplicado na rotina do seu escritório." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-bg-image py-24 px-4">
      <img src={bgSolution} alt="" className="section-bg-img" />
      <div className="section-bg-overlay" style={{ background: "hsl(var(--background) / 0.92)" }} />

      <div className="section-content max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold">Perguntas Frequentes</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="card-feature cursor-pointer" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-semibold text-sm md:text-base">
                  <span className="gradient-text-gold mr-2">{String(i + 1).padStart(2, "0")}</span>
                  {faq.q}
                </h4>
                <ChevronDown size={18} className="shrink-0 transition-transform duration-300 text-muted-foreground"
                  style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0)" }} />
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }} className="overflow-hidden">
                    <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
