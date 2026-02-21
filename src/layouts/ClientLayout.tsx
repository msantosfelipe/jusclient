import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClientLayoutProps {
  children: React.ReactNode;
  clientName?: string;
}

const ClientLayout = ({ children, clientName = "João Silva" }: ClientLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login-cliente");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-[#2E2E2E] bg-[#0F0F0F]">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          {/* Logo */}
          <Link to="/cliente/casos" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-[#FFC107]/10 border border-[#FFC107]/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#FFC107]" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">JUSCLIENT</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/cliente/casos"
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/cliente/casos")
                  ? "text-[#FFC107]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Meus Casos
            </Link>
          </nav>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end">
              <p className="text-sm font-medium text-foreground">{clientName}</p>
              <p className="text-xs text-muted-foreground">Cliente</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground hover:bg-[#1A1A1A]"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#2E2E2E] bg-[#1A1A1A]">
            <nav className="flex flex-col p-4 gap-2">
              <Link
                to="/cliente/casos"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive("/cliente/casos")
                    ? "bg-[#FFC107] text-black"
                    : "text-muted-foreground hover:bg-[#2E2E2E]"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Meus Casos
              </Link>
              <div className="border-t border-[#2E2E2E] my-2" />
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-[#2E2E2E] transition-colors text-left"
              >
                Sair
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2E2E2E] bg-[#0F0F0F] mt-16 py-8">
        <div className="px-4 md:px-8 max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 Jusclient — Comunicação Transparente com seu Advogado</p>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;
