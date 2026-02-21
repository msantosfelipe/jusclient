import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Bell, Clock, AlertTriangle } from "lucide-react";

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

const FEED_PROCESS_UPDATES = [
  {
    client: "Maria Fernanda Santos",
    processNumber: "0001234-56.2024.8.05.0001",
    impactExplanation:
      "O juiz recebeu nossos documentos; agora ele vai analisar as provas para decidir o valor da indenização.",
    processPhase: "Análise do Juiz",
    expectedNextStep: "Expectativa: 15 dias para decisão",
  },
  {
    client: "João Pedro Oliveira",
    processNumber: "0002456-78.2024.8.05.0002",
    impactExplanation:
      "O documento que enviamos foi anexado ao processo. O juiz e a outra parte agora têm acesso a essas informações.",
    processPhase: "Juntada de Documentos",
    expectedNextStep: "Expectativa: manifestação da outra parte em até 15 dias",
  },
  {
    client: "Ana Carolina Lima",
    processNumber: "0003456-89.2024.8.05.0003",
    impactExplanation:
      "O juiz tomou a decisão final sobre o caso. É uma conquista importante — em breve você receberá a comunicação oficial.",
    processPhase: "Decisão Final",
    expectedNextStep: "Expectativa: publicação da sentença em 3 a 5 dias úteis",
  },
  {
    client: "Roberto Almeida Costa",
    processNumber: "0004567-12.2024.8.05.0004",
    impactExplanation:
      "O réu foi notificado oficialmente sobre a ação. Agora ele tem prazo para se defender e apresentar sua versão.",
    processPhase: "Fase Inicial",
    expectedNextStep: "Expectativa: resposta do réu em até 30 dias",
  },
  {
    client: "Patrícia Mendes",
    processNumber: "0005678-34.2024.8.05.0005",
    impactExplanation:
      "Houve uma atualização no processo e você foi oficialmente avisada. Nada que requeira ação imediata da sua parte.",
    processPhase: "Andamento Processual",
    expectedNextStep: "Expectativa: próximos passos conforme cronograma do juiz",
  },
];

const ANXIETY_MANAGEMENT = [
  { name: "Maria Fernanda Santos", accesses: 12 },
  { name: "João Pedro Oliveira", accesses: 9 },
  { name: "Ana Carolina Lima", accesses: 7 },
];

const Dashboard = () => {
  const activeProcesses = 12;
  const planLimit = 30;
  const progressPercent = (activeProcesses / planLimit) * 100;

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
                  {FEED_PROCESS_UPDATES.map((item) => (
                    <article
                      key={item.processNumber}
                      className="group rounded-lg border border-border bg-background/50 p-4 transition-colors hover:bg-background/80"
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold" style={{ color: "#FFC107" }}>
                          {item.client}
                        </h4>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {item.processPhase}
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

          {/* Widget Gestão de Ansiedade */}
          <div>
            <Card className="border-border bg-[#1E1E1E]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <CardTitle>Gestão de Ansiedade</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Clientes que mais acessaram nas últimas 24h — considere um contato proativo
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {ANXIETY_MANAGEMENT.map((client, index) => (
                    <li
                      key={client.name}
                      className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {index + 1}
                        </span>
                        <span className="font-medium">{client.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {client.accesses} acessos
                      </span>
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
