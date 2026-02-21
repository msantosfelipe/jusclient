import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, FileText, MessageCircle } from "lucide-react";

const examples = [
  {
    technical: "Conclusos para despacho.",
    simple: "O processo está na mesa do juiz aguardando uma decisão sobre o próximo passo.",
  },
  {
    technical: "Intimação da parte contrária para manifestação.",
    simple: "O juiz pediu para a outra parte do processo se pronunciar sobre o assunto.",
  },
  {
    technical: "Certidão de trânsito em julgado expedida.",
    simple: "Não cabe mais nenhum recurso. A decisão do juiz é definitiva.",
  },
];

const TranslatorSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSimple, setShowSimple] = useState(false);

  return (
    <section className="py-24 px-4 bg-surface">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Tradutor de Juridiquês</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Veja a <span className="text-gradient-primary">tradução</span> em ação
          </h2>
        </motion.div>

        {/* Example tabs */}
        <div className="flex gap-2 justify-center mb-8 flex-wrap">
          {examples.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); setShowSimple(false); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeIndex === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Exemplo {i + 1}
            </button>
          ))}
        </div>

        {/* Translator card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-surface overflow-hidden"
        >
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Technical side */}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-destructive" />
                <span className="text-xs font-semibold uppercase tracking-wider text-destructive">Linguagem Técnica</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`tech-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-lg font-medium leading-relaxed"
                >
                  "{examples[activeIndex].technical}"
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Simple side */}
            <div className="p-6 md:p-8 bg-secondary/5">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-4 h-4 text-secondary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Linguagem Jusclient</span>
              </div>
              <AnimatePresence mode="wait">
                {showSimple ? (
                  <motion.p
                    key={`simple-${activeIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-lg leading-relaxed text-muted-foreground"
                  >
                    "{examples[activeIndex].simple}"
                  </motion.p>
                ) : (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowSimple(true)}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    Clique para traduzir
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TranslatorSection;
