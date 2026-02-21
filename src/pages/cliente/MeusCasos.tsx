import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientLayout from "@/layouts/ClientLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CaseStatus = "petição" | "provas" | "sentença" | "conclusão";

interface Case {
  id: string;
  apelido: string;
  numero: string;
  advogado: string;
  status: CaseStatus;
  stage: 1 | 2 | 3 | 4;
  ultimaAtualizacao: string;
}

// Mock Data
const MOCK_CASOS: Case[] = [
  {
    id: "1",
    apelido: "Indenização por Danos Morais",
    numero: "0001234-56.2024.8.05.0001",
    advogado: "Dr. Roberto Alencar",
    status: "sentença",
    stage: 3,
    ultimaAtualizacao: "Audiência de julgamento marcada para 15 de março",
  },
  {
    id: "2",
    apelido: "Divórcio Consensual",
    numero: "0002456-78.2024.8.05.0002",
    advogado: "Dra. Juliana Meireles",
    status: "petição",
    stage: 1,
    ultimaAtualizacao: "Petição inicial aceita pelo tribunal",
  },
  {
    id: "3",
    apelido: "Revisional de Contrato",
    numero: "0003456-89.2024.8.05.0003",
    advogado: "Dr. Roberto Alencar",
    status: "provas",
    stage: 2,
    ultimaAtualizacao: "Prazo para apresentação de provas: 30 dias",
  },
];

// Progress Bar Component
const ProgressBar = ({ stage }: { stage: 1 | 2 | 3 | 4 }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4].map((s) => (
      <div
        key={s}
        className={cn(
          "h-1.5 flex-1 rounded-full transition-colors",
          s <= stage ? "bg-[#FFC107]" : "bg-[#2E2E2E]"
        )}
      />
    ))}
  </div>
);

// Status Badge
const getStatusLabel = (status: CaseStatus): string => {
  const labels = {
    petição: "Petição Inicial",
    provas: "Fase de Provas",
    sentença: "Fase de Sentença",
    conclusão: "Conclusão",
  };
  return labels[status];
};

const MeusCasos = () => {
  const navigate = useNavigate();
  const [casos] = useState<Case[]>(MOCK_CASOS);

  const handleViewDetails = (caseId: string) => {
    navigate(`/cliente/casos/${caseId}`);
  };

  return (
    <ClientLayout clientName="João Silva">
      <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Olá, João. Veja o andamento dos seus casos acompanhados pelo Jusclient.
          </h1>
          <p className="text-muted-foreground">
            {casos.length} casos sendo gerenciados
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {casos.map((caso) => (
            <Card
              key={caso.id}
              className="border-[#2E2E2E] bg-[#1A1A1A] hover:border-[#FFC107]/50 transition-all cursor-pointer group"
              onClick={() => handleViewDetails(caso.id)}
            >
              <CardHeader className="pb-4">
                {/* Case Nickname */}
                <CardTitle className="text-lg text-foreground group-hover:text-[#FFC107] transition-colors line-clamp-2">
                  {caso.apelido}
                </CardTitle>

                {/* Lawyer Name with Icon */}
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <User className="w-4 h-4 text-[#FFC107]" />
                  <span className="text-[#FFC107] font-medium">{caso.advogado}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Status Badge */}
                <Badge className="w-fit bg-[#FFC107]/20 text-[#FFC107] border-[#FFC107]/30 text-xs">
                  {getStatusLabel(caso.status)}
                </Badge>

                {/* Mini Progress Bar */}
                <ProgressBar stage={caso.stage} />

                {/* View Details Button */}
                <Button
                  onClick={() => handleViewDetails(caso.id)}
                  className="w-full gap-2 bg-[#FFC107] text-black hover:bg-[#FFD54F] group-hover:shadow-lg group-hover:shadow-[#FFC107]/20 transition-all"
                >
                  Ver Detalhes do Caso
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Footer */}
        <div className="rounded-lg border border-[#2E2E2E] bg-[#1A1A1A] p-6">
          <p className="text-center text-sm text-muted-foreground">
            Não encontrou um processo? Entre em contato com seu advogado para ele te convidar para o Jusclient
          </p>
        </div>
      </div>
    </ClientLayout>
  );
};

export default MeusCasos;
