import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, ArrowLeft } from "lucide-react";

const LoginCliente = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: redireciona para o Dashboard do Cliente
    navigate("/cliente/casos");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0F0F0F]">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>

        <div className="rounded-lg border border-[#2E2E2E] bg-[#1A1A1A] p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#FFC107]/10 border border-[#FFC107]/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#FFC107]" />
            </div>
            <span className="text-xl font-bold text-foreground">JUSCLIENT</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-2">Acesso do Cliente</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Acompanhe o andamento dos seus processos judiciais
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0F0F0F] border-[#2E2E2E] text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">Senha</Label>
                <a
                  href="#"
                  className="text-xs text-[#FFC107] hover:text-[#FFD54F] transition-colors"
                >
                  Esqueci minha senha
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#0F0F0F] border-[#2E2E2E] text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#FFC107] text-black hover:bg-[#FFD54F] font-semibold"
            >
              Entrar
            </Button>
          </form>

          {/* Lawyer Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            É advogado?{" "}
            <Link
              to="/login"
              className="text-[#FFC107] hover:text-[#FFD54F] font-medium transition-colors"
            >
              Entre por aqui
            </Link>
          </p>
        </div>

        {/* Support Message */}
        <div className="mt-8 p-4 rounded-lg border border-[#2E2E2E] bg-[#1A1A1A]/50">
          <p className="text-xs text-muted-foreground text-center">
            Não tem acesso? Peça ao seu advogado para te convidar para o Jusclient
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCliente;
