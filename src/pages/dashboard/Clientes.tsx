import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Mail, Phone, FileText, Send, Download, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data Types
type ClientStatus = "ativo" | "pendente";

type Cliente = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  processosCount: number;
  status: ClientStatus;
  lastAccess?: string;
  processos: {
    id: string;
    nome: string;
    numero: string;
  }[];
  acessoFrequencia: Array<{
    semana: string;
    acessos: number;
  }>;
};

// Mock Clients Data
const MOCK_CLIENTES: Cliente[] = [
  {
    id: "1",
    nome: "Maria Fernanda Santos",
    email: "maria.santos@email.com",
    telefone: "(85) 98765-4321",
    processosCount: 2,
    status: "ativo",
    lastAccess: "2 horas atrás",
    processos: [
      { id: "p1", nome: "Ação de Indenização", numero: "0001234-56.2024.8.05.0001" },
      { id: "p2", nome: "Ação Trabalhista", numero: "0002456-78.2024.8.05.0002" },
    ],
    acessoFrequencia: [
      { semana: "Sem. 1", acessos: 2 },
      { semana: "Sem. 2", acessos: 5 },
      { semana: "Sem. 3", acessos: 3 },
      { semana: "Sem. 4", acessos: 8 },
    ],
  },
  {
    id: "2",
    nome: "João Pedro Oliveira",
    email: "joao.oliveira@email.com",
    telefone: "(85) 99876-5432",
    processosCount: 3,
    status: "ativo",
    lastAccess: "5 dias atrás",
    processos: [
      { id: "p3", nome: "Execução de Títulos", numero: "0003456-89.2024.8.05.0003" },
      { id: "p4", nome: "Contrato de Prestação", numero: "0004567-12.2024.8.05.0004" },
      { id: "p5", nome: "Reclamação Consumidor", numero: "0005678-34.2024.8.05.0005" },
    ],
    acessoFrequencia: [
      { semana: "Sem. 1", acessos: 1 },
      { semana: "Sem. 2", acessos: 3 },
      { semana: "Sem. 3", acessos: 2 },
      { semana: "Sem. 4", acessos: 4 },
    ],
  },
  {
    id: "3",
    nome: "Ana Carolina Lima",
    email: "ana.lima@email.com",
    telefone: "(85) 98765-5555",
    processosCount: 1,
    status: "pendente",
    lastAccess: undefined,
    processos: [
      { id: "p6", nome: "Ação de Reparação", numero: "0006789-45.2024.8.05.0006" },
    ],
    acessoFrequencia: [
      { semana: "Sem. 1", acessos: 0 },
      { semana: "Sem. 2", acessos: 0 },
      { semana: "Sem. 3", acessos: 0 },
      { semana: "Sem. 4", acessos: 0 },
    ],
  },
];

// Component: Access Frequency Graph
const AccessFrequencyGraph = ({ data }: { data: Array<{ semana: string; acessos: number }> }) => {
  const maxAcessos = Math.max(...data.map((d) => d.acessos), 1);

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-foreground">Frequência de Acesso (últimas 4 semanas)</h4>
      <div className="flex items-end gap-4 rounded-lg bg-[#1A1A1A] p-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t bg-gradient-to-t from-[#FFC107] to-[#FFD54F] transition-all duration-300"
              style={{
                height: `${(item.acessos / maxAcessos) * 80}px`,
                minHeight: item.acessos === 0 ? "2px" : "auto",
              }}
            />
            <span className="text-xs text-muted-foreground">{item.semana}</span>
            <span className="text-xs font-semibold text-foreground">{item.acessos}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component: Client Detail Modal
const ClientDetailModal = ({
  cliente,
  isOpen,
  onClose,
}: {
  cliente: Cliente | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!cliente) return null;

  const handleResendInvite = () => {
    alert(`✓ Convite reenviado para ${cliente.email}`);
  };

  const handleGenerateReport = () => {
    alert(`✓ Relatório de Transparência gerado para ${cliente.nome} (PDF simulado)`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto bg-[#1A1A1A] border-[#2E2E2E]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">{cliente.nome}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Perfil detalhado do cliente e resumo de processos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Dados de Contato</h4>
            <div className="flex items-center gap-3 rounded-lg bg-[#0F0F0F] p-3 text-sm">
              <Mail className="h-4 w-4 text-[#FFC107]" />
              <span className="text-foreground">{cliente.email}</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-[#0F0F0F] p-3 text-sm">
              <Phone className="h-4 w-4 text-[#FFC107]" />
              <span className="text-foreground">{cliente.telefone}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#0F0F0F] p-3 text-sm">
              <span className="text-muted-foreground">Status de Acesso:</span>
              <Badge
                variant={cliente.status === "ativo" ? "default" : "secondary"}
                className={cn(
                  "text-xs",
                  cliente.status === "ativo"
                    ? "bg-green-900/50 text-green-400"
                    : "bg-yellow-900/50 text-yellow-400"
                )}
              >
                {cliente.status === "ativo" ? "✓ Ativo" : "◯ Pendente"}
              </Badge>
            </div>
            {cliente.lastAccess && (
              <div className="flex items-center justify-between rounded-lg bg-[#0F0F0F] p-3 text-sm">
                <span className="text-muted-foreground">Último Acesso:</span>
                <span className="text-foreground">{cliente.lastAccess}</span>
              </div>
            )}
          </div>

          {/* Quick Links to Processes */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Processos ({cliente.processosCount})</h4>
            <div className="space-y-2">
              {cliente.processos.map((processo) => (
                <div
                  key={processo.id}
                  className="flex items-center justify-between rounded-lg border border-[#2E2E2E] bg-[#0F0F0F] p-3 text-sm hover:bg-[#1A1A1A] transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{processo.nome}</p>
                    <p className="text-xs text-muted-foreground">{processo.numero}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#FFC107] hover:bg-[#FFC107]/10"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Access Frequency Graph */}
          <AccessFrequencyGraph data={cliente.acessoFrequencia} />

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleResendInvite}
              className="flex-1 gap-2 bg-[#FFC107] text-black hover:bg-[#FFD54F]"
            >
              <Send className="h-4 w-4" />
              Reenviar Convite
            </Button>
            <Button
              onClick={handleGenerateReport}
              variant="outline"
              className="flex-1 gap-2 border-[#2E2E2E] hover:bg-[#1A1A1A]"
            >
              <Download className="h-4 w-4" />
              Gerar Relatório
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main Component
const Clientes = () => {
  const [search, setSearch] = useState("");
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredClientes = MOCK_CLIENTES.filter((c) =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleClientClick = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCliente(null), 300);
  };

  const activeCount = MOCK_CLIENTES.filter((c) => c.status === "ativo").length;
  const pendingCount = MOCK_CLIENTES.filter((c) => c.status === "pendente").length;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 bg-[#0F0F0F] p-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Meus Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie seus clientes e acompanhe o engajamento na plataforma
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card className="border-[#2E2E2E] bg-[#1A1A1A]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FFC107]">{MOCK_CLIENTES.length}</div>
            </CardContent>
          </Card>

          <Card className="border-[#2E2E2E] bg-[#1A1A1A]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Clientes Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{activeCount}</div>
            </CardContent>
          </Card>

          <Card className="border-[#2E2E2E] bg-[#1A1A1A]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Convites Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">{pendingCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-3 rounded-lg border border-[#2E2E2E] bg-[#1A1A1A] px-4 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Clients Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredClientes.map((cliente) => (
            <Card
              key={cliente.id}
              className="border-[#2E2E2E] bg-[#1A1A1A] hover:border-[#FFC107]/50 transition-all cursor-pointer group"
              onClick={() => handleClientClick(cliente)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground group-hover:text-[#FFC107] transition-colors">
                      {cliente.nome}
                    </CardTitle>
                    <CardDescription className="text-xs mt-1">{cliente.email}</CardDescription>
                  </div>
                  <Badge
                    variant={cliente.status === "ativo" ? "default" : "secondary"}
                    className={cn(
                      "text-xs whitespace-nowrap",
                      cliente.status === "ativo"
                        ? "bg-green-900/50 text-green-400"
                        : "bg-yellow-900/50 text-yellow-400"
                    )}
                  >
                    {cliente.status === "ativo" ? "✓ Ativo" : "◯ Pendente"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Process Count */}
                <div className="flex items-center justify-between rounded-lg bg-[#0F0F0F] p-3">
                  <span className="text-sm text-muted-foreground">Processos</span>
                  <span className="text-lg font-bold text-[#FFC107]">{cliente.processosCount}</span>
                </div>

                {/* Last Access */}
                {cliente.lastAccess ? (
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500">●</span> Logou {cliente.lastAccess}
                  </div>
                ) : (
                  <div className="text-xs text-yellow-500">
                    <span>●</span> Nunca acessou a plataforma
                  </div>
                )}

                {/* View Details Button */}
                <Button
                  onClick={() => handleClientClick(cliente)}
                  className="w-full gap-2 bg-[#FFC107] text-black hover:bg-[#FFD54F] group-hover:shadow-lg group-hover:shadow-[#FFC107]/20 transition-all"
                >
                  <Eye className="h-4 w-4" />
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredClientes.length === 0 && (
          <Card className="border-[#2E2E2E] bg-[#1A1A1A]">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-center">
                Nenhum cliente encontrado com "{search}"
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Client Detail Modal */}
      <ClientDetailModal
        cliente={selectedCliente}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </DashboardLayout>
  );
};

export default Clientes;
