import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Briefcase, Bell, Clock, AlertTriangle, Eye, EyeOff } from "lucide-react";

type FeedUpdateItem = {
  client: string;
  processNumber: string;
  impactExplanation: string;
  processPhase: string;
  expectedNextStep: string;
  legalText: string;
  visible: boolean;
};

// Dados mockados
const SUMMARY_CARDS = [
  {
    title: "Processos Ativos",
    value: "12 / 30",
    subtext: "Plano Solo",
    icon: Briefcase,
  },
  {
    title: "Atualizações Hoje",
    value: "5 novas movimentações",
    subtext: "Últimas 24h",
    icon: Bell,
  },
  {
    title: "Tempo Economizado",
    value: "18 horas/mês",
    subtext: "Estimativa com automação",
    icon: Clock,
  },
];

const FEED_PROCESS_UPDATES_INITIAL: FeedUpdateItem[] = [
  {
    client: "Maria Fernanda Santos",
    processNumber: "0001234-56.2024.8.05.0001",
    impactExplanation:
      "O juiz recebeu nossos documentos; agora ele vai analisar as provas para decidir o valor da indenização.",
    processPhase: "Análise do Juiz",
    expectedNextStep: "Expectativa: 15 dias para decisão",
    legalText:
      "Vistos. Conclusos os autos para despacho. O juízo, após análise dos elementos de prova dos autos, proferirá decisão nos termos do art. 487 do CPC.",
    visible: true,
  },
  {
    client: "João Pedro Oliveira",
    processNumber: "0002456-78.2024.8.05.0002",
    impactExplanation:
      "O documento que enviamos foi anexado ao processo. O juiz e a outra parte agora têm acesso a essas informações.",
    processPhase: "Juntada de Documentos",
    expectedNextStep: "Expectativa: manifestação da outra parte em até 15 dias",
    legalText:
      "Juntada de petição às fls. 45/48. A parte autora apresenta memoriais em resposta à contestação, requerendo a produção de provas em audiência. Intime-se a parte contrária para, no prazo legal, manifestar-se.",
    visible: true,
  },
  {
    client: "Ana Carolina Lima",
    processNumber: "0003456-89.2024.8.05.0003",
    impactExplanation:
      "O juiz tomou a decisão final sobre o caso. É uma conquista importante — em breve você receberá a comunicação oficial.",
    processPhase: "Decisão Final",
    expectedNextStep: "Expectativa: publicação da sentença em 3 a 5 dias úteis",
    legalText:
      "Ante o exposto, julgamento antecipado da lide, nos termos do art. 330, I, do CPC. Julgo PROCEDENTES os pedidos para condenar o réu ao pagamento de indenização por danos materiais e morais. P.R.I.",
    visible: true,
  },
  {
    client: "Roberto Almeida Costa",
    processNumber: "0004567-12.2024.8.05.0004",
    impactExplanation:
      "O réu foi notificado oficialmente sobre a ação. Agora ele tem prazo para se defender e apresentar sua versão.",
    processPhase: "Fase Inicial",
    expectedNextStep: "Expectativa: resposta do réu em até 30 dias",
    legalText:
      "Concedida a citação do réu por edital, na forma do art. 256 do CPC. Intimação publicada em 10/02/2025. O réu deverá contestar no prazo de 30 (trinta) dias, contados da data da publicação.",
    visible: false,
  },
  {
    client: "Patrícia Mendes",
    processNumber: "0005678-34.2024.8.05.0005",
    impactExplanation:
      "Houve uma atualização no processo e você foi oficialmente avisada. Nada que requeira ação imediata da sua parte.",
    processPhase: "Andamento Processual",
    expectedNextStep: "Expectativa: próximos passos conforme cronograma do juiz",
    legalText:
      "Intimação às fls. 120. Intime-se a parte autora, nos termos do art. 239 do CPC, para ciência da determinação judicial que fixou a data de realização da audiência de conciliação.",
    visible: true,
  },
];

type AlertStatus = "Estável" | "Atento" | "Crítico";

const ANXIETY_ALERTS: {
  client: string;
  processNickname: string;
  accesses: number;
  status: AlertStatus;
}[] = [
  { client: "Maria Fernanda Santos", processNickname: "Ação de Indenização", accesses: 12, status: "Crítico" },
  { client: "João Pedro Oliveira", processNickname: "Ação Trabalhista", accesses: 9, status: "Atento" },
  { client: "Ana Carolina Lima", processNickname: "Execução de Títulos", accesses: 7, status: "Atento" },
  { client: "Roberto Almeida Costa", processNickname: "Contrato de Prestação", accesses: 4, status: "Estável" },
];

const STATUS_BADGE_STYLES: Record<AlertStatus, string> = {
  Estável: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Atento: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Crítico: "bg-red-500/20 text-red-400 border-red-500/30",
};

const PROACTIVE_TEMPLATES = [
  {
    id: "sem-novidades",
    label: "Sem novidades, mas de olho",
    text: "Olá! Passando para avisar que conferi seu processo agora. Ele segue aguardando o juiz, o que é normal nesta fase. Qualquer mudança, eu te aviso aqui!",
  },
  {
    id: "explicacao-prazo",
    label: "Explicação de Prazo",
    text: "Olá! O prazo para a outra parte responder termina em 5 dias. Assim que eles se manifestarem, eu simplifico o texto para você.",
  },
];

const Dashboard = () => {
  const activeProcesses = 12;
  const planLimit = 30;
  const progressPercent = (activeProcesses / planLimit) * 100;

  const [feedUpdates, setFeedUpdates] = useState<FeedUpdateItem[]>(FEED_PROCESS_UPDATES_INITIAL);
  const [selectedItem, setSelectedItem] = useState<FeedUpdateItem | null>(null);
  const [editedTranslation, setEditedTranslation] = useState("");

  const [selectedProactiveAlert, setSelectedProactiveAlert] = useState<(typeof ANXIETY_ALERTS)[number] | null>(null);
  const [proactiveMessage, setProactiveMessage] = useState("");

  const openProactiveModal = (alert: (typeof ANXIETY_ALERTS)[number]) => {
    setSelectedProactiveAlert(alert);
    setProactiveMessage("");
  };

  const closeProactiveModal = () => {
    setSelectedProactiveAlert(null);
    setProactiveMessage("");
  };

  const handleSelectTemplate = (template: (typeof PROACTIVE_TEMPLATES)[number]) => {
    const firstName = selectedProactiveAlert?.client.split(" ")[0] ?? "";
    const personalized = template.text
      .replace(/Olá!/, `Olá, ${firstName}!`);
    setProactiveMessage(personalized);
  };

  const handleSendProactiveMessage = () => {
    // Mock: enviaria a mensagem
    closeProactiveModal();
  };

  const openModal = (item: FeedUpdateItem) => {
    setSelectedItem(item);
    setEditedTranslation(item.impactExplanation);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleSaveAndNotify = () => {
    if (!selectedItem) return;
    setFeedUpdates((prev) =>
      prev.map((u) =>
        u.processNumber === selectedItem.processNumber
          ? { ...u, impactExplanation: editedTranslation }
          : u
      )
    );
    closeModal();
  };

  const handleToggleVisibility = () => {
    if (!selectedItem) return;
    setFeedUpdates((prev) =>
      prev.map((u) =>
        u.processNumber === selectedItem.processNumber ? { ...u, visible: !u.visible } : u
      )
    );
    closeModal();
  };

  return (
    <DashboardLayout lawyerName="Dr. Carlos Silva">
      <div className="space-y-8">
        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-3">
          {SUMMARY_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.title}
                className="border-border bg-[#1E1E1E] text-card-foreground"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.subtext}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Monitor de Capacidade */}
        <Card className="border-border bg-[#1E1E1E]">
          <CardHeader>
            <CardTitle className="text-base">Monitor de Capacidade — Plano Solo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progressPercent} className="h-3 bg-muted" />
            <p className="text-sm text-muted-foreground">
              Você está a{" "}
              <span className="font-medium text-foreground">
                {planLimit - activeProcesses} processos
              </span>{" "}
              do limite do seu plano.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Feed de Atualizações de Processos */}
          <div className="lg:col-span-2">
            <Card className="border-border bg-[#1E1E1E]">
              <CardHeader>
                <CardTitle>Feed de Atualizações de Processos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedUpdates.map((item) => (
                    <article
                      key={item.processNumber}
                      onClick={() => openModal(item)}
                      className="group cursor-pointer rounded-lg border border-border bg-background/50 p-4 transition-colors hover:bg-background/80"
                    >
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold text-foreground">{item.client}</h4>
                          <span
                            className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium"
                            style={{ color: "#FFC107" }}
                          >
                            {item.processPhase}
                          </span>
                        </div>
                        <span title={item.visible ? "Visível para o cliente" : "Oculta do cliente"}>
                          {item.visible ? (
                            <Eye className="h-4 w-4 shrink-0 text-muted-foreground" />
                          ) : (
                            <EyeOff className="h-4 w-4 shrink-0 text-muted-foreground" />
                          )}
                        </span>
                      </div>
                      <p className="mb-3 text-sm leading-relaxed text-foreground">
                        {item.impactExplanation}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground">
                          {item.expectedNextStep}
                        </p>
                        <span className="text-xs font-mono text-muted-foreground">
                          {item.processNumber}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Modal de Comparação */}
          <Dialog open={!!selectedItem} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="max-w-3xl border-border bg-[#1E1E1E]">
              <DialogHeader>
                <DialogTitle>
                  Revisão de Atualização — {selectedItem?.processNumber}
                </DialogTitle>
                <DialogDescription>
                  Compare o texto jurídico original com a tradução Jusclient e edite conforme necessário.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Texto Jurídico Original (PJe)
                  </label>
                  <div className="min-h-[140px] rounded-lg border border-border bg-muted/30 p-3 text-sm leading-relaxed text-foreground">
                    {selectedItem?.legalText}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Tradução Jusclient
                  </label>
                  <Textarea
                    value={editedTranslation}
                    onChange={(e) => setEditedTranslation(e.target.value)}
                    className="min-h-[140px] resize-none border-border bg-background/50"
                    placeholder="Versão simplificada para o cliente..."
                  />
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={handleToggleVisibility}
                >
                  {selectedItem?.visible ? "Ocultar Movimentação" : "Exibir Movimentação"}
                </Button>
                <Button
                  variant="hero"
                  className="bg-primary text-primary-foreground"
                  onClick={handleSaveAndNotify}
                >
                  Salvar e Notificar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Acalmar Cliente */}
          <Dialog open={!!selectedProactiveAlert} onOpenChange={(open) => !open && closeProactiveModal()}>
            <DialogContent className="max-w-lg border-border bg-[#1E1E1E]">
              <DialogHeader>
                <DialogTitle>Acalmar Cliente</DialogTitle>
                <DialogDescription>
                  {selectedProactiveAlert && (
                    <span style={{ color: "#FFC107" }}>
                      {selectedProactiveAlert.client} | {selectedProactiveAlert.processNickname}
                    </span>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Templates
                  </label>
                  <div className="flex flex-col gap-2">
                    {PROACTIVE_TEMPLATES.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => handleSelectTemplate(template)}
                        className="rounded-lg border border-border bg-background/50 px-4 py-3 text-left text-sm transition-colors hover:bg-background/80 hover:border-primary/50"
                      >
                        <span className="font-medium text-foreground">{template.label}</span>
                        <p className="mt-1 line-clamp-2 text-muted-foreground">{template.text}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Personalizar mensagem
                  </label>
                  <Textarea
                    value={proactiveMessage}
                    onChange={(e) => setProactiveMessage(e.target.value)}
                    placeholder="Escreva ou edite a mensagem para o cliente..."
                    className="min-h-[100px] resize-none border-border"
                  />
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full bg-primary py-6 text-base text-primary-foreground"
                  onClick={handleSendProactiveMessage}
                >
                  Enviar Mensagem
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Widget Gestão de Ansiedade */}
          <div>
            <Card className="border-border bg-[#1E1E1E]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <CardTitle>Gestão de Ansiedade</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Casos que podem gerar chamadas ou mensagens em breve devido à alta frequência de acesso.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {ANXIETY_ALERTS.map((alert) => (
                    <li
                      key={`${alert.client}-${alert.processNickname}`}
                      className="rounded-lg border border-border bg-background/50 p-4"
                    >
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-semibold" style={{ color: "#FFC107" }}>
                          {alert.client} | {alert.processNickname}
                        </h4>
                        <Badge
                          variant="outline"
                          className={cn("border", STATUS_BADGE_STYLES[alert.status])}
                        >
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="mb-3 text-xs text-muted-foreground">
                        {alert.accesses} visualizações hoje
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-primary/50 text-primary hover:bg-primary/10"
                        onClick={() => openProactiveModal(alert)}
                      >
                        Enviar Mensagem
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
