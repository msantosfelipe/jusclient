import { Link, useParams } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Pencil,
  EyeOff,
  Bell,
  MoreVertical,
  CheckCircle2,
  Clock,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TIMELINE_PHASES = [
  { id: 1, label: "Petição Inicial" },
  { id: 2, label: "Instrução" },
  { id: 3, label: "Sentença" },
  { id: 4, label: "Recurso" },
];

type MessageStatus = "enviada" | "aguardando";

type Movimentacao = {
  id: string;
  technicalTerm: string;
  translation: string;
  status: MessageStatus;
  hiddenFromClient: boolean;
};

type ProcessoDetail = {
  id: string;
  client: string;
  processNickname: string;
  processNumber: string;
  tribunal: string;
  lastUpdate: string;
  currentPhase: number;
  movimentacoes: Movimentacao[];
};

const MOCK_DETALHES: Record<string, ProcessoDetail> = {
  "1": {
    id: "1",
    client: "Maria Fernanda Santos",
    processNickname: "Ação de Indenização",
    processNumber: "0001234-56.2024.8.05.0001",
    tribunal: "TJCE - Tribunal de Justiça do Ceará",
    lastUpdate: "15/02/2025",
    currentPhase: 2,
    movimentacoes: [
      {
        id: "m1",
        technicalTerm: "Certificada a publicação da petição inicial no Diário da Justiça Eletrônico.",
        translation: "Sua ação foi protocolada e publicada oficialmente. O processo está em andamento.",
        status: "enviada",
        hiddenFromClient: false,
      },
      {
        id: "m2",
        technicalTerm: "Concedida a citação do réu por edital, na forma do art. 256 do CPC.",
        translation: "O réu foi notificado oficialmente sobre a ação. Agora ele tem prazo para se defender.",
        status: "enviada",
        hiddenFromClient: false,
      },
      {
        id: "m3",
        technicalTerm: "Conclusos os autos para despacho. O juízo proferirá decisão nos termos do art. 487 do CPC.",
        translation: "Aguardando decisão do juiz. O processo está na fase de análise das provas.",
        status: "enviada",
        hiddenFromClient: false,
      },
      {
        id: "m4",
        technicalTerm: "Juntada de petição às fls. 45/48. Memoriais em resposta à contestação.",
        translation: "Documento anexado ao processo. Nossa resposta à defesa do réu foi registrada.",
        status: "aguardando",
        hiddenFromClient: false,
      },
    ],
  },
  "2": {
    id: "2",
    client: "João Pedro Oliveira",
    processNickname: "Ação Trabalhista",
    processNumber: "0002456-78.2024.8.05.0002",
    tribunal: "TRT 7ª Região - Ceará",
    lastUpdate: "18/02/2025",
    currentPhase: 1,
    movimentacoes: [
      {
        id: "m1",
        technicalTerm: "Certificada a publicação da petição inicial no DJe.",
        translation: "Sua ação trabalhista foi protocolada e publicada oficialmente.",
        status: "enviada",
        hiddenFromClient: false,
      },
      {
        id: "m2",
        technicalTerm: "Intimação para manifestação sobre pedido de tutela antecipada.",
        translation: "O juiz pediu mais informações sobre o pedido de decisão urgente.",
        status: "enviada",
        hiddenFromClient: false,
      },
      {
        id: "m3",
        technicalTerm: "Juntada de documento às fls. 23/25.",
        translation: "Documento anexado ao processo.",
        status: "aguardando",
        hiddenFromClient: false,
      },
    ],
  },
  "3": {
    id: "3",
    client: "Ana Carolina Lima",
    processNickname: "Execução de Títulos",
    processNumber: "0003456-89.2024.8.05.0003",
    tribunal: "TJCE - 1ª Vara Cível",
    lastUpdate: "20/02/2025",
    currentPhase: 4,
    movimentacoes: [
      {
        id: "m1",
        technicalTerm: "Certificada a publicação da sentença no Diário da Justiça Eletrônico.",
        translation: "A decisão do juiz foi publicada oficialmente. Agora as partes têm prazo para analisar e decidir se vão aceitar ou recorrer.",
        status: "enviada",
        hiddenFromClient: false,
      },
      {
        id: "m2",
        technicalTerm: "Trânsito em julgado. Expedidos os mandados de citação para cumprimento da sentença.",
        translation: "O prazo para recursos acabou. O juiz determinou a notificação da outra parte para pagar o valor devido.",
        status: "enviada",
        hiddenFromClient: false,
      },
      {
        id: "m3",
        technicalTerm: "Recurso de apelação interposto pela parte ré.",
        translation: "A outra parte entrou com recurso. O processo segue para análise do tribunal.",
        status: "enviada",
        hiddenFromClient: false,
      },
    ],
  },
  "4": {
    id: "4",
    client: "Roberto Almeida Costa",
    processNickname: "Contrato de Prestação",
    processNumber: "0004567-12.2024.8.05.0004",
    tribunal: "TJCE - 2ª Vara Cível",
    lastUpdate: "12/02/2025",
    currentPhase: 1,
    movimentacoes: [
      {
        id: "m1",
        technicalTerm: "Distribuído por sorteio. Processo recebido na vara.",
        translation: "O processo foi distribuído para o juiz que irá analisar o caso.",
        status: "enviada",
        hiddenFromClient: false,
      },
      {
        id: "m2",
        technicalTerm: "Concedida a citação do réu por edital.",
        translation: "O réu foi notificado oficialmente. Ele terá 30 dias para apresentar a defesa.",
        status: "aguardando",
        hiddenFromClient: false,
      },
    ],
  },
  "5": {
    id: "5",
    client: "Patrícia Mendes",
    processNickname: "Reclamação Consumidor",
    processNumber: "0005678-34.2024.8.05.0005",
    tribunal: "Juizado Especial Cível - Fortaleza",
    lastUpdate: "19/02/2025",
    currentPhase: 2,
    movimentacoes: [
      {
        id: "m1",
        technicalTerm: "Certificada a publicação da petição inicial.",
        translation: "Sua reclamação foi protocolada e publicada.",
        status: "enviada",
        hiddenFromClient: false,
      },
      {
        id: "m2",
        technicalTerm: "Intimação para audiência de conciliação designada para 28/02/2025.",
        translation: "Você foi convocada para uma audiência de conciliação no dia 28/02/2025. Compareça para tentar um acordo.",
        status: "enviada",
        hiddenFromClient: false,
      },
      {
        id: "m3",
        technicalTerm: "Conclusos para decisão. Juiz analisará os autos.",
        translation: "O juiz vai analisar o caso e tomar uma decisão em breve.",
        status: "aguardando",
        hiddenFromClient: false,
      },
      {
        id: "m4",
        technicalTerm: "Juntada de documento complementar às fls. 18/20.",
        translation: "Documento adicional foi anexado ao processo.",
        status: "aguardando",
        hiddenFromClient: true,
      },
    ],
  },
};

const DEFAULT_PROCESSO: ProcessoDetail = MOCK_DETALHES["1"];

const DetalhesProcesso = () => {
  const { id } = useParams<{ id: string }>();
  const processo = (id && MOCK_DETALHES[id]) || DEFAULT_PROCESSO;

  return (
    <DashboardLayout lawyerName="Dr. Carlos Silva">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Link Voltar */}
        <Link
          to="/dashboard/processos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar a Meus Processos
        </Link>

        {/* Cabeçalho */}
        <div>
          <h1
            className="text-2xl font-bold sm:text-3xl"
            style={{ color: "#FFC107" }}
          >
            {processo.client} | {processo.processNickname}
          </h1>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="font-mono">{processo.processNumber}</span>
            <span>{processo.tribunal}</span>
            <span>Última atualização: {processo.lastUpdate}</span>
          </div>
        </div>

        {/* Timeline de Progresso */}
        <Card className="border-border bg-[#1E1E1E]">
          <CardHeader>
            <CardTitle className="text-base">Etapas do Processo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="flex items-start justify-between gap-2">
                {TIMELINE_PHASES.map((phase, index) => {
                  const isActive = phase.id === processo.currentPhase;
                  const isPast = phase.id < processo.currentPhase;
                  const lineToNextFilled = isPast && phase.id < TIMELINE_PHASES.length;
                  return (
                    <div key={phase.id} className="flex flex-1 flex-col items-center">
                      <div className="flex w-full items-center">
                        {index > 0 && (
                          <div
                            className={cn(
                              "h-0.5 flex-1",
                              isPast ? "bg-[#FFC107]" : "bg-muted"
                            )}
                          />
                        )}
                        <div
                          className={cn(
                            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                            isActive &&
                              "border-[#FFC107] bg-[#FFC107]/20 shadow-[0_0_16px_rgba(255,193,7,0.5)]",
                            isPast && "border-[#FFC107] bg-[#FFC107]",
                            !isActive && !isPast && "border-muted bg-muted/30"
                          )}
                        >
                          {isPast && (
                            <CheckCircle2 className="h-5 w-5 text-background" />
                          )}
                          {isActive && (
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: "#FFC107" }}
                            />
                          )}
                        </div>
                        {index < TIMELINE_PHASES.length - 1 && (
                          <div
                            className={cn(
                              "h-0.5 flex-1",
                              lineToNextFilled ? "bg-[#FFC107]" : "bg-muted"
                            )}
                          />
                        )}
                      </div>
                      <span
                        className={cn(
                          "mt-2 text-center text-xs font-medium",
                          isActive ? "text-[#FFC107]" : "text-muted-foreground"
                        )}
                      >
                        {phase.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Mensagens */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Feed de Tradução</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 text-destructive focus:text-destructive">
                <Trash2 className="h-4 w-4" />
                Arquivar Processo
              </Button>
              <Button
                variant="hero"
                size="sm"
                className="gap-2 bg-primary text-primary-foreground"
              >
                <Bell className="h-4 w-4" />
                Notificar Agora
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {processo.movimentacoes.map((mov) => (
              <Card
                key={mov.id}
                className={cn(
                  "overflow-hidden border-border bg-[#1E1E1E]",
                  mov.hiddenFromClient && "opacity-60"
                )}
              >
                <CardContent className="p-0">
                  <div className="grid gap-0 md:grid-cols-2">
                    <div className="border-b border-border bg-muted/20 p-4 md:border-b-0 md:border-r">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Termo Técnico (PJe)
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">
                        {mov.technicalTerm}
                      </p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Tradução Jusclient
                      </p>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "#FFC107" }}>
                        {mov.translation}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-border bg-background/30 px-4 py-2">
                    <div className="flex items-center gap-2">
                      {mov.status === "enviada" ? (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-500">
                          <CheckCircle2 className="h-4 w-4" />
                          Enviada ao Inbox do Cliente
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-amber-500">
                          <Clock className="h-4 w-4" />
                          Aguardando Revisão
                        </span>
                      )}
                      {mov.hiddenFromClient && (
                        <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          Oculta
                        </span>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Ações</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-border bg-[#1E1E1E]">
                        <DropdownMenuItem className="gap-2">
                          <Pencil className="h-4 w-4" />
                          Editar Tradução
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <EyeOff className="h-4 w-4" />
                          Ocultar do Cliente
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DetalhesProcesso;
