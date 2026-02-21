import { useParams, useNavigate } from "react-router-dom";
import ClientLayout from "@/layouts/ClientLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Calendar, AlertCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type CaseStatus = "petição" | "provas" | "sentença" | "conclusão";

interface CaseDetail {
  id: string;
  apelido: string;
  numero: string;
  advogado: string;
  status: CaseStatus;
  stage: 1 | 2 | 3 | 4;
  ultimaAtualizacao: string;
  explicacao: string;
  timeline: Array<{
    data: string;
    titulo: string;
    explicacao: string;
  }>;
}

// Mock Data
const MOCK_CASOS_DETAIL: Record<string, CaseDetail> = {
  "1": {
    id: "1",
    apelido: "Indenização por Danos Morais",
    numero: "0001234-56.2024.8.05.0001",
    advogado: "Dr. Roberto Alencar",
    status: "sentença",
    stage: 3,
    ultimaAtualizacao: "Audiência de julgamento marcada para 15 de março",
    explicacao:
      "Seu caso está na fase de sentença, onde o juiz está analisando todas as provas apresentadas. A audiência de julgamento foi marcada para 15 de março de 2026. Isso significa que em breve você saberá a decisão final sobre sua indenização. O Dr. Roberto está preparando os argumentos finais para apresentar ao juiz.",
    timeline: [
      {
        data: "21 de fevereiro",
        titulo: "Audiência de Julgamento Marcada",
        explicacao:
          "A audiência foi oficialmente marcada para 15 de março. Isso significa que seu caso chegou à etapa final, onde o juiz proferirá a sentença.",
      },
      {
        data: "10 de fevereiro",
        titulo: "Parecer do MP Recebido",
        explicacao:
          "O Ministério Público apresentou seu parecer favorável à sua indenização. Isso fortalece sua posição no processo.",
      },
      {
        data: "01 de fevereiro",
        titulo: "Provas Aceitas",
        explicacao:
          "Todas as provas apresentadas foram aceitas pelo tribunal. Agora faltam apenas os argumentos finais antes da sentença.",
      },
      {
        data: "20 de janeiro",
        titulo: "Petição Inicial Aceita",
        explicacao:
          "Seu caso foi oficialmente aceito pelo tribunal e começou sua tramitação legal.",
      },
    ],
  },
  "2": {
    id: "2",
    apelido: "Divórcio Consensual",
    numero: "0002456-78.2024.8.05.0002",
    advogado: "Dra. Juliana Meireles",
    status: "petição",
    stage: 1,
    ultimaAtualizacao: "Petição inicial aceita pelo tribunal",
    explicacao:
      "Seu processo de divórcio consensual foi iniciado. A Dra. Juliana está preparando todos os documentos necessários. Um divórcio consensual é mais rápido e simples porque ambas as partes concordam com os termos. Os próximos passos envolvem a aprovação da petição e o agendamento da audiência.",
    timeline: [
      {
        data: "21 de fevereiro",
        titulo: "Petição Inicial Aceita",
        explicacao:
          "Sua petição de divórcio consensual foi aceita pelo tribunal. Agora aguardamos o agendamento da audiência inicial.",
      },
    ],
  },
  "3": {
    id: "3",
    apelido: "Revisional de Contrato",
    numero: "0003456-89.2024.8.05.0003",
    advogado: "Dr. Roberto Alencar",
    status: "provas",
    stage: 2,
    ultimaAtualizacao: "Prazo para apresentação de provas: 30 dias",
    explicacao:
      "Seu caso está na fase de provas. O Dr. Roberto está reunindo todos os documentos necessários para comprovar que o contrato precisa ser revisado. Você tem 30 dias para apresentar as provas. Isso inclui contratos anteriores, comunicações com a outra parte e qualquer documento relevante.",
    timeline: [
      {
        data: "21 de fevereiro",
        titulo: "Prazo de Provas Iniciado",
        explicacao:
          "O período de apresentação de provas começou. Você tem 30 dias para enviar todos os documentos pertinentes ao Dr. Roberto.",
      },
      {
        data: "15 de fevereiro",
        titulo: "Réu Notificado",
        explicacao:
          "A outra parte foi oficialmente notificada sobre o processo e tem direito de apresentar suas próprias provas.",
      },
      {
        data: "10 de fevereiro",
        titulo: "Petição Aceita",
        explicacao: "Sua petição inicial foi aceita e o processo começou oficialmente.",
      },
    ],
  },
};

// Progress Stages Component
const ProgressStages = ({ stage, status }: { stage: 1 | 2 | 3 | 4; status: CaseStatus }) => {
  const stages = [
    { num: 1, label: "Petição", key: "petição" },
    { num: 2, label: "Provas", key: "provas" },
    { num: 3, label: "Sentença", key: "sentença" },
    { num: 4, label: "Conclusão", key: "conclusão" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Onde meu processo está?</h3>
      <div className="flex items-center gap-2">
        {stages.map((s, idx) => (
          <div key={s.num} className="flex items-center">
            {/* Stage Circle */}
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all",
                stage >= s.num
                  ? "bg-[#FFC107] text-black"
                  : "bg-[#2E2E2E] text-muted-foreground"
              )}
            >
              {s.num}
            </div>

            {/* Connector Line */}
            {idx < stages.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-1 rounded transition-all",
                  stage > s.num ? "bg-[#FFC107]" : "bg-[#2E2E2E]"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Stage Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        {stages.map((s) => (
          <span key={s.num} className="w-10 text-center">
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
};

const DetalhesProcessoCliente = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const caso = id ? MOCK_CASOS_DETAIL[id] : null;

  if (!caso) {
    return (
      <ClientLayout>
        <div className="px-4 md:px-8 py-8 max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/cliente/casos")}
            className="gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Casos
          </Button>
          <Card className="border-[#2E2E2E] bg-[#1A1A1A]">
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">Caso não encontrado</p>
            </CardContent>
          </Card>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="px-4 md:px-8 py-8 max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/cliente/casos")}
          className="gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos Casos
        </Button>

        {/* Case Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{caso.apelido}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Processo nº {caso.numero}
              </p>
            </div>
            <Badge className="bg-[#FFC107]/20 text-[#FFC107] border-[#FFC107]/30">
              Ativo
            </Badge>
          </div>

          {/* Lawyer Info */}
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-[#FFC107]" />
            <span className="text-[#FFC107] font-medium">{caso.advogado}</span>
          </div>
        </div>

        {/* Progress Section */}
        <Card className="border-[#2E2E2E] bg-[#1A1A1A] mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Progresso do Processo</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressStages stage={caso.stage} status={caso.status} />
          </CardContent>
        </Card>

        {/* Latest Update Card */}
        <Card className="border-[#FFC107]/30 bg-gradient-to-br from-[#FFC107]/5 to-[#1A1A1A] mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <CardTitle className="text-lg text-[#FFC107]">
                  Última Atualização
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-2">
                  {caso.ultimaAtualizacao}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground text-base leading-relaxed">
              {caso.explicacao}
            </p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-[#2E2E2E] bg-[#1A1A1A] mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#FFC107]" />
              Inbox de Atualizações
            </CardTitle>
            <CardDescription>
              Histórico de notificações e explicações do seu advogado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {caso.timeline.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[#FFC107] mt-1.5" />
                    {idx < caso.timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-[#2E2E2E] mt-2" />
                    )}
                  </div>

                  {/* Timeline Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{item.data}</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {item.titulo}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.explicacao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Footer */}
        <Card className="border-[#2E2E2E] bg-[#1A1A1A]">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <p className="text-sm font-medium text-foreground">
                Dúvidas urgentes?
              </p>
              <p className="text-sm text-muted-foreground">
                Entre em contato com seu advogado pelo canal oficial. O Jusclient
                é para informações sobre o andamento do seu processo.
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                📧 {caso.advogado.toLowerCase().replace(" ", ".")}@advogados.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default DetalhesProcessoCliente;
