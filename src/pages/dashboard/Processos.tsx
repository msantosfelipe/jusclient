import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, CheckCircle2, Circle, Pencil, Archive, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = "todos" | "pendentes" | "concluidos";

type ProcessoItem = {
  id: string;
  client: string;
  processNickname: string;
  processNumber: string;
  progressStage: 1 | 2 | 3;
  lastMessage: string;
  readByClient: boolean;
  status: "ativo" | "pendente" | "concluido";
};

const MOCK_PROCESSOS: ProcessoItem[] = [
  {
    id: "1",
    client: "Maria Fernanda Santos",
    processNickname: "Ação de Indenização",
    processNumber: "0001234-56.2024.8.05.0001",
    progressStage: 2,
    lastMessage: "Aguardando decisão do juiz",
    readByClient: true,
    status: "pendente",
  },
  {
    id: "2",
    client: "João Pedro Oliveira",
    processNickname: "Ação Trabalhista",
    processNumber: "0002456-78.2024.8.05.0002",
    progressStage: 1,
    lastMessage: "Documento anexado ao processo",
    readByClient: false,
    status: "pendente",
  },
  {
    id: "3",
    client: "Ana Carolina Lima",
    processNickname: "Execução de Títulos",
    processNumber: "0003456-89.2024.8.05.0003",
    progressStage: 3,
    lastMessage: "Juiz proferiu decisão final",
    readByClient: true,
    status: "concluido",
  },
  {
    id: "4",
    client: "Roberto Almeida Costa",
    processNickname: "Contrato de Prestação",
    processNumber: "0004567-12.2024.8.05.0004",
    progressStage: 1,
    lastMessage: "Réu foi notificado oficialmente",
    readByClient: false,
    status: "ativo",
  },
  {
    id: "5",
    client: "Patrícia Mendes",
    processNickname: "Reclamação Consumidor",
    processNumber: "0005678-34.2024.8.05.0005",
    progressStage: 2,
    lastMessage: "Você foi avisada sobre andamento processual",
    readByClient: true,
    status: "ativo",
  },
];

const ProgressBar3Stages = ({ stage }: { stage: 1 | 2 | 3 }) => (
  <div className="flex gap-1">
    {[1, 2, 3].map((s) => (
      <div
        key={s}
        className={cn(
          "h-2 flex-1 rounded-sm transition-colors",
          s <= stage ? "bg-[#FFC107]" : "bg-muted"
        )}
      />
    ))}
  </div>
);

const Processos = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("todos");

  const filteredProcessos = MOCK_PROCESSOS.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.processNumber.includes(search) ||
      p.processNickname.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "todos") return true;
    if (filter === "pendentes") return p.status === "pendente";
    if (filter === "concluidos") return p.status === "concluido";

    return true;
  });

  const activeProcesses = 13;
  const planLimit = 30;

  return (
    <DashboardLayout lawyerName="Dr. Carlos Silva">
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Meus Processos</h1>
          <p className="text-sm text-muted-foreground">
            <span style={{ color: "#FFC107" }} className="font-semibold">
              {activeProcesses} de {planLimit}
            </span>{" "}
            processos ativos
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente ou nº do processo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "todos" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("todos")}
              className={filter === "todos" ? "bg-primary text-primary-foreground" : ""}
            >
              Todos
            </Button>
            <Button
              variant={filter === "pendentes" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pendentes")}
              className={filter === "pendentes" ? "bg-primary text-primary-foreground" : ""}
            >
              Atualizações Pendentes
            </Button>
            <Button
              variant={filter === "concluidos" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("concluidos")}
              className={filter === "concluidos" ? "bg-primary text-primary-foreground" : ""}
            >
              Concluídos
            </Button>
          </div>
        </div>

        {/* Listagem - Tabela (desktop) */}
        <div className="hidden overflow-hidden rounded-lg border border-border bg-[#1E1E1E] md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Cliente / Caso
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground w-32">
                    Progresso
                  </th>
                  <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                    Última Mensagem
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground w-24">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground w-40">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProcessos.map((proc) => (
                  <tr
                    key={proc.id}
                    className="border-b border-border transition-colors last:border-0 hover:bg-background/30"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p
                          className="font-semibold"
                          style={{ color: "#FFC107" }}
                        >
                          {proc.client} | {proc.processNickname}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {proc.processNumber}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <ProgressBar3Stages stage={proc.progressStage} />
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {proc.lastMessage}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {proc.readByClient ? (
                        <CheckCircle2
                          className="mx-auto h-5 w-5 text-emerald-500"
                          title="Cliente visualizou"
                        />
                      ) : (
                        <Circle
                          className="mx-auto h-5 w-5 text-muted-foreground"
                          title="Não visualizado"
                        />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" className="shrink-0">
                          Ver Detalhes
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Mais opções</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-border bg-[#1E1E1E]">
                            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                              <Trash2 className="h-4 w-4" />
                              Arquivar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Listagem - Cards (mobile) */}
        <div className="space-y-3 rounded-lg border border-border bg-[#1E1E1E] p-3 md:hidden">
          {filteredProcessos.map((proc) => (
            <div
              key={`mobile-${proc.id}`}
              className="rounded-lg border border-border bg-background/50 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold" style={{ color: "#FFC107" }}>
                    {proc.client} | {proc.processNickname}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{proc.lastMessage}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {proc.readByClient ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-border bg-[#1E1E1E]">
                      <DropdownMenuItem className="gap-2">
                        <Pencil className="h-4 w-4" />
                        Editar Tradução
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Archive className="h-4 w-4" />
                        Arquivar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <ProgressBar3Stages stage={proc.progressStage} />
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredProcessos.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            Nenhum processo encontrado.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Processos;
