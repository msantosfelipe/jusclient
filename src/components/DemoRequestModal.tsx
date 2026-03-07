import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "../lib/supabase"

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
]

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  law_firm: string;
  email: string;
  city: string;
  state: string;
  lawyers_count: string;
}

const DemoRequestModal = ({ isOpen, onClose }: DemoRequestModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    law_firm: "",
    email: "",
    city: "",
    state: "",
    lawyers_count: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validação
    if (!formData.name.trim()) {
      setError("Por favor, preencha seu nome.");
      return;
    }
    if (!formData.law_firm.trim()) {
      setError("Por favor, preencha o nome do escritório.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Por favor, preencha seu e-mail.");
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    if (!isEmailValid) {
      setError("Digite um e-mail válido.");
      return;
    }

    if (!formData.city.trim()) {
      setError("Por favor, preencha a cidade.");
      return;
    }
    if (!formData.state) {
      setError("Por favor, selecione um estado.");
      return;
    }
    if (!formData.lawyers_count.trim()) {
      setError("Por favor, preencha o número de advogados.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      // Enviar dados para Supabase
      const { data, error: supabaseError } = await supabase
        .from("leads_vsl")
        .insert([
          {
            name: formData.name.trim(),
            law_firm: formData.law_firm.trim(),
            email: formData.email.trim().toLowerCase(),
            city: formData.city.trim(),
            state: formData.state,
            lawyers_count: parseInt(formData.lawyers_count, 10),
            created_at: new Date().toISOString(),
          },
        ]);

      if (supabaseError) {
        console.error("Erro ao enviar para Supabase:", supabaseError);
        setError("Não foi possível enviar agora. Tente novamente.");
        setIsSuccess(false);
        return;
      }

      setIsSuccess(true);

      // Limpar formulário após sucesso
      setTimeout(() => {
        setFormData({
          name: "",
          law_firm: "",
          email: "",
          city: "",
          state: "",
          lawyers_count: "",
        });
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Erro ao processar solicitação:", err);
      setError("Não foi possível enviar agora. Tente novamente.");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-lg rounded-xl border border-border bg-[#1E1E1E] p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-[#2E2E2E] hover:text-foreground"
          aria-label="Fechar modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        {!isSuccess ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Solicitar Demonstração Gratuita
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Preencha os dados abaixo e entraremos em contato.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nome *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-10 border-border bg-[#111111] text-base placeholder:text-muted-foreground"
                  disabled={isSubmitting}
                />
              </div>

              {/* Escritório */}
              <div className="space-y-2">
                <Label htmlFor="law_firm" className="text-sm font-medium">
                  Escritório *
                </Label>
                <Input
                  id="law_firm"
                  name="law_firm"
                  type="text"
                  placeholder="Nome do seu escritório"
                  value={formData.law_firm}
                  onChange={handleChange}
                  className="h-10 border-border bg-[#111111] text-base placeholder:text-muted-foreground"
                  disabled={isSubmitting}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-10 border-border bg-[#111111] text-base placeholder:text-muted-foreground"
                  disabled={isSubmitting}
                  autoComplete="email"
                />
              </div>

              {/* Cidade e Estado */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Cidade */}
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">
                    Cidade *
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Ex: São Paulo"
                    value={formData.city}
                    onChange={handleChange}
                    className="h-10 border-border bg-[#111111] text-base placeholder:text-muted-foreground"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Estado */}
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">
                    Estado *
                  </Label>
                  <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))} disabled={isSubmitting}>
                    <SelectTrigger id="state" className="h-10 border-border bg-[#111111] text-base">
                      <SelectValue placeholder="Selecione um estado" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E1E1E] border-border">
                      {BRAZILIAN_STATES.map((state) => (
                        <SelectItem key={state.value} value={state.value} className="text-foreground hover:bg-[#2E2E2E]">
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Número de Advogados */}
              <div className="space-y-2">
                <Label htmlFor="lawyers_count" className="text-sm font-medium">
                  Número de Advogados *
                </Label>
                <Input
                  id="lawyers_count"
                  name="lawyers_count"
                  type="number"
                  placeholder="Ex: 5"
                  value={formData.lawyers_count}
                  onChange={handleChange}
                  className="h-10 border-border bg-[#111111] text-base placeholder:text-muted-foreground"
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

              {/* Submit Button */}
              <Button
                type="submit"
                variant="hero"
                className="mt-6 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          </>
        ) : (
          /* Success Message */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-8 text-center"
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
              <h3 className="text-lg font-semibold text-foreground">
                Solicitação enviada com sucesso!
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Entraremos em contato em breve. Obrigado por seu interesse no Jusclient.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DemoRequestModal;
