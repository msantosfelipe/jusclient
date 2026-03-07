import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo_v1.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const howItWorksItems = [
  {
    title: "Vincule o processo (CNJ)",
    description: "Conecte o processo uma vez e deixe o fluxo automatizado.",
  },
  {
    title: "Nossa IA simplifica a atualização",
    description: "A linguagem técnica vira explicação clara em segundos.",
  },
  {
    title: "Seu cliente recebe no celular",
    description: "Menos interrupções, mais previsibilidade no atendimento.",
  },
];

const benefitItems = [
  {
    title: "Transparência 24/7",
    description: "O cliente acompanha o progresso sem te interromper.",
  },
  {
    title: "Inteligência Artificial",
    description: "Tradução instantânea do juridiquês para linguagem simples.",
  },
  {
    title: "Foco Total",
    description: "Recupere horas para petições, audiências e estratégia.",
  },
];

const VslPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isEmailValid) {
      setError("Digite um e-mail válido.");
      setIsSuccess(false);
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      // TODO: substituir por integração real com Supabase.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setIsSuccess(true);
      setEmail("");
    } catch {
      setError("Não foi possível enviar agora. Tente novamente.");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToWaitlist = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen text-foreground"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <header className="border-b border-white/10" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-4">
          <img src={logo} alt="Jusclient" className="h-10 w-auto md:h-12" />
      </div>
      </header>

      <section className="relative px-4 py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-2 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
        </div>

        <div className="relative mx-auto w-full max-w-4xl text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold leading-tight md:text-5xl"
          >
            Recupere sua produtividade: O Jusclient traduz o &quot;Juridiquês&quot; para seus clientes por
            você.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Reduza em até 70% as mensagens e ligações de clientes ansiosos com explicações claras,
            visuais e automáticas.
          </motion.p>

          <motion.form
            id="waitlist-form"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.14 }}
            onSubmit={handleWaitlistSubmit}
            className="mx-auto mt-8 max-w-2xl rounded-xl border border-border bg-[#1E1E1E] p-4 md:p-5"
            aria-label="Formulário da fila de espera"
          >
            <label htmlFor="waitlist-email" className="sr-only">
              E-mail
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="waitlist-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite seu melhor e-mail"
                className="h-12 border-border bg-[#111111] text-base placeholder:text-muted-foreground"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "waitlist-error" : "waitlist-success"}
              />
              <Button type="submit" variant="hero" className="h-12 px-6" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Garantir Acesso Antecipado"}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>

            {error && (
              <p id="waitlist-error" className="mt-3 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            {isSuccess && !error && (
              <p id="waitlist-success" className="mt-3 text-sm text-emerald-400" role="status">
                Enviado com sucesso. Você está na fila de acesso antecipado.
              </p>
            )}
          </motion.form>
        </div>
      </section>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5 }}
        className="px-4 pb-14 md:pb-16"
      >
        <div className="mx-auto w-full max-w-5xl rounded-xl border border-border bg-[#1E1E1E] p-4 md:p-7">
          <div className="aspect-video w-full rounded-lg border border-border bg-gradient-to-br from-[#242424] via-[#1A1A1A] to-[#111111]">
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <button
                disabled
                type="button"
                className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/60 bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:enabled:scale-105"
                aria-label="Play do vídeo de apresentação"
              >
                <Play className="h-7 w-7 fill-current" />
              </button>
              <p className="max-w-md px-4 text-sm text-muted-foreground md:text-base">
                Em breve, você verá como o Jusclient vai mudar seu escritório
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="px-4 py-14 md:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl font-bold md:text-4xl">Como Funciona</h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {howItWorksItems.map((item, index) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-xl border border-border bg-[#1E1E1E] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Passo {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 md:pb-16">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl font-bold md:text-4xl">Benefícios para seu escritório</h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {benefitItems.map((item, index) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-xl border border-border bg-[#1E1E1E] p-5"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
          className="mx-auto w-full max-w-4xl rounded-xl border border-primary/25 bg-primary/10 px-5 py-6 text-center"
        >
          <p className="text-sm text-muted-foreground md:text-base">
            Entre agora na fila de espera e seja um dos primeiros a usar o Jusclient no seu escritório.
          </p>
          <Button variant="hero" className="mt-4" onClick={scrollToWaitlist}>
            Quero entrar na fila de espera
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">
            Jusclient © 2026 - Transformando a comunicação jurídica.
          </p>
          <a
            href="https://instagram.com/jusclient"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </footer>
    </motion.main>
  );
};

export default VslPage;
