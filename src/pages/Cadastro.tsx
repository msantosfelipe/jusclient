import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, ArrowLeft, Check, Sparkles, Info } from "lucide-react";

const plans = [
  { id: "solo", name: "Solo", price: "R$ 127/mês", available: true },
  { id: "escritorio", name: "Escritório", price: "R$ 397/mês", available: false },
  { id: "enterprise", name: "Enterprise", price: "R$ 1.497/mês", available: false },
  { id: "institucional", name: "Institucional", price: "R$ 24.000/ano", available: false },
];

const Cadastro = () => {
  const [selectedPlan, setSelectedPlan] = useState("solo");
  const [form, setForm] = useState({ name: "", email: "", password: "", oab: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future backend integration
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-lg">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>

        <div className="card-surface p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold">JUSCLIENT</span>
          </div>

          <h1 className="text-2xl font-bold mb-2">Criar Conta</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Cadastre-se e comece a transformar sua comunicação com clientes.
          </p>

          {/* Info banner */}
          <div className="flex items-start gap-3 bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-8">
            <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Jusclient reduz o bombardeio de mensagens e perguntas em até 70%</strong>, liberando seu tempo para focar no que realmente importa.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="bg-muted border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="bg-muted border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                className="bg-muted border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="oab">Número da OAB</Label>
              <Input
                id="oab"
                placeholder="Ex: 123456/SP"
                value={form.oab}
                onChange={(e) => updateField("oab", e.target.value)}
                className="bg-muted border-border"
              />
            </div>

            {/* Plan selector */}
            <div className="space-y-3">
              <Label>Plano desejado</Label>
              <div className="grid grid-cols-2 gap-3">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    disabled={!plan.available}
                    onClick={() => plan.available && setSelectedPlan(plan.id)}
                    className={`relative text-left p-3 rounded-lg border transition-all ${
                      selectedPlan === plan.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-muted hover:border-muted-foreground/30"
                    } ${!plan.available ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {selectedPlan === plan.id && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    {plan.id === "solo" && (
                      <Sparkles className="w-3 h-3 text-primary mb-1" />
                    )}
                    <div className="text-sm font-semibold">{plan.name}</div>
                    <div className="text-xs text-muted-foreground">{plan.price}</div>
                    {!plan.available && (
                      <div className="text-xs text-muted-foreground mt-1">Em Breve</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Button variant="hero" className="w-full mt-2" type="submit">
              Criar Conta
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
