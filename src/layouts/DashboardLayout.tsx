import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  Briefcase,
  Users,
  CreditCard,
  Settings,
  Plus,
  Scale,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { to: "/dashboard", label: "Início (Dashboard)", icon: Home },
  { to: "/dashboard/processos", label: "Meus Processos", icon: Briefcase },
  { to: "/dashboard/clientes", label: "Meus Clientes", icon: Users },
  { to: "/dashboard/assinatura", label: "Assinatura e Limites", icon: CreditCard },
  { to: "/dashboard/configuracoes", label: "Configurações", icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  lawyerName?: string;
}

const DashboardLayout = ({ children, lawyerName = "Dr. Carlos Silva" }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Scale className="h-5 w-5 text-primary" />
        </div>
        <span className="text-lg font-bold tracking-tight">JUSCLIENT</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-hidden p-4">
        {SIDEBAR_ITEMS.map(({ to, label, icon: Icon }) => {
          const isActive =
            to === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className="min-w-0 shrink-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span className="truncate">{label}</span>
              </div>
            </Link>
          );
        })}
        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span>Sair</span>
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#0F0F0F]">
      {/* Desktop Sidebar - fixa à esquerda, fundo #121212 */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-border transition-all duration-200 md:flex",
          sidebarCollapsed ? "w-0 overflow-hidden" : "w-56"
        )}
        style={{ backgroundColor: "#121212" }}
      >
        <SidebarContent />
      </aside>

      {/* Main content area */}
      <div
        className={cn(
          "flex flex-1 flex-col transition-[padding] duration-200 pl-0",
          !sidebarCollapsed && "md:pl-56"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 md:gap-3">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-56 bg-[#121212] p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 hidden md:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "Exibir menu" : "Ocultar menu"}
            >
              {sidebarCollapsed ? (
                <PanelLeft className="h-5 w-5" />
              ) : (
                <PanelLeftClose className="h-5 w-5" />
              )}
              <span className="sr-only">{sidebarCollapsed ? "Exibir menu" : "Ocultar menu"}</span>
            </Button>
            <p className="text-sm font-medium text-foreground hidden md:block">{lawyerName}</p>
          </div>
          <p className="text-sm font-medium text-foreground flex-1 text-center md:hidden">{lawyerName}</p>
          <Link to="/dashboard/adicionar-processo">
            <Button
              variant="hero"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">Adicionar Processo</span>
              <span className="md:hidden">+</span>
            </Button>
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
