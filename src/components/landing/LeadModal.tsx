import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "../../lib/supabase"

const BRAZILIAN_STATES = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
}

const LeadModal = ({ open, onClose }: LeadModalProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    escritorio: "",
    email: "",
    cidade: "",
    estado: "",
    numAdvogados: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validações
      if (!formData.nome.trim()) {
        setError("Por favor, preencha seu nome.");
        setIsSubmitting(false);
        return;
      }

      if (!formData.escritorio.trim()) {
        setError("Por favor, preencha o nome do escritório.");
        setIsSubmitting(false);
        return;
      }

      if (!formData.email.trim()) {
        setError("Por favor, preencha seu e-mail.");
        setIsSubmitting(false);
        return;
      }

      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
      if (!isEmailValid) {
        setError("Digite um e-mail válido.");
        setIsSubmitting(false);
        return;
      }

      if (!formData.cidade.trim()) {
        setError("Por favor, preencha a cidade.");
        setIsSubmitting(false);
        return;
      }

      if (!formData.estado) {
        setError("Por favor, selecione um estado.");
        setIsSubmitting(false);
        return;
      }

      if (!formData.numAdvogados.trim()) {
        setError("Por favor, preencha o número de advogados.");
        setIsSubmitting(false);
        return;
      }

      // Enviar para Supabase
      const { data, error: supabaseError } = await supabase
        .from("leads_vsl")
        .insert([
          {
            name: formData.nome.trim(),
            law_firm: formData.escritorio.trim(),
            email: formData.email.trim().toLowerCase(),
            city: formData.cidade.trim(),
            state: formData.estado,
            lawyers_count: parseInt(formData.numAdvogados, 10),
            created_at: new Date().toISOString(),
          },
        ]);

      if (supabaseError) {
        console.error("Erro ao enviar para Supabase:", supabaseError);
        setError("Não foi possível enviar agora. Tente novamente.");
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      setFormData({
        nome: "",
        escritorio: "",
        email: "",
        cidade: "",
        estado: "",
        numAdvogados: "",
      });

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Erro ao processar solicitação:", err);
      setError("Não foi possível enviar agora. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "hsla(0,0%,0%,0.7)", backdropFilter: "blur(4px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="glass-surface w-full max-w-md p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold mb-2">Solicitar Demonstração Gratuita</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Preencha os dados abaixo e entraremos em contato.
            </p>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 py-6 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <svg
                    className="h-6 w-6 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Solicitação enviada com sucesso!
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Entraremos em contato em breve.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: "nome", label: "Nome", placeholder: "Seu nome completo" },
                { key: "escritorio", label: "Escritório", placeholder: "Nome do escritório" },
                { key: "email", label: "Email", placeholder: "seu@email.com", type: "email" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    required
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              ))}

              {/* Cidade e Estado */}
              <div className="grid grid-cols-2 gap-3">
                {/* Cidade */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Cidade</label>
                  <input
                    type="text"
                    placeholder="Ex: São Paulo"
                    required
                    value={formData.cidade}
                    onChange={(e) =>
                      setFormData({ ...formData, cidade: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Estado</label>
                  <select
                    required
                    value={formData.estado}
                    onChange={(e) =>
                      setFormData({ ...formData, estado: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    <option value="">Selecione...</option>
                    {BRAZILIAN_STATES.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Número de Advogados */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Nº de Advogados</label>
                <input
                  type="number"
                  placeholder="Ex: 5"
                  required
                  value={formData.numAdvogados}
                  onChange={(e) =>
                    setFormData({ ...formData, numAdvogados: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  disabled={isSubmitting}
                  min="1"
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary-glow w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
              </button>
            </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;
