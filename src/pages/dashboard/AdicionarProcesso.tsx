import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_CLIENTS = [
  { id: "1", name: "Maria Fernanda Santos" },
  { id: "2", name: "João Pedro Oliveira" },
  { id: "3", name: "Ana Carolina Lima" },
  { id: "4", name: "Roberto Almeida Costa" },
  { id: "5", name: "Patrícia Mendes" },
];

const FASES_PROCESSO = [
  { value: "inicial", label: "Fase Inicial" },
  { value: "contestacao", label: "Aguardando Contestação" },
  { value: "provas", label: "Produção de Provas" },
  { value: "decisao", label: "Aguardando Decisão" },
  { value: "sentenca", label: "Sentença Proferida" },
];

const AdicionarProcesso = () => {
  const navigate = useNavigate();
  const [processNumber, setProcessNumber] = useState("");
  const [searchResult, setSearchResult] = useState<{
    tribunal: string;
    vara: string;
    assunto: string;
  } | null>(null);
  const [searching, setSearching] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [communicationMode, setCommunicationMode] = useState<"manual" | "auto">("manual");
  const [faseInicial, setFaseInicial] = useState("inicial");

  const handleSearch = () => {
    if (!processNumber.trim()) return;
    setSearching(true);
    // Mock: simula busca
    setTimeout(() => {
      setSearchResult({
        tribunal: "TJCE - Tribunal de Justiça do Ceará",
        vara: "1ª Vara Cível de Fortaleza",
        assunto: "Direito do Consumidor",
      });
      setSearching(false);
    }, 800);
  };

  const isStep2Visible = searchResult !== null;
  const isStep3Visible = selectedClient !== "";
  const isButtonEnabled = selectedClient !== "";

  const handleConfirm = () => {
    navigate("/dashboard/processos");
  };

  const activeProcesses = 12;
  const planLimit = 30;
  const progressPercent = (activeProcesses / planLimit) * 100;

  return (
    <DashboardLayout lawyerName="Dr. Carlos Silva">
      <div className="mx-auto max-w-5xl">
        {/* Cabeçalho */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Vincular Novo Processo</h1>
            <Link
              to="/dashboard"
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Conteúdo principal */}
          <div className="space-y-8">
            {/* Passo 1 - Busca */}
            <Card className="border-border bg-[#1E1E1E]">
              <CardHeader>
                <CardTitle className="text-base">Passo 1 — Buscar Processo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="process-number">Número do Processo (CNJ)</Label>
                    <Input
                      id="process-number"
                      placeholder="0000000-00.0000.0.00.0000"
                      value={processNumber}
                      onChange={(e) => setProcessNumber(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleSearch}
                      disabled={searching}
                      className="bg-primary text-primary-foreground"
                    >
                      <Search className="h-4 w-4" />
                      Realizar Busca
                    </Button>
                  </div>
                </div>
                {searchResult && (
                  <Card className="border-primary/30 bg-primary/5">
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Dados Encontrados
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Tribunal:</span>{" "}
                        <span className="font-medium">{searchResult.tribunal}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Vara:</span>{" "}
                        <span className="font-medium">{searchResult.vara}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Assunto:</span>{" "}
                        <span className="font-medium" style={{ color: "#FFC107" }}>
                          {searchResult.assunto}
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Passo 2 - Cliente */}
            {isStep2Visible && (
              <Card className="border-border bg-[#1E1E1E]">
                <CardHeader>
                  <CardTitle className="text-base">Passo 2 — Vincular Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Cliente</Label>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger className="border-border bg-background">
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_CLIENTS.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Este cliente receberá as atualizações simplificadas no Jusclient.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Passo 3 - Configurações de Comunicação */}
            {isStep3Visible && (
              <Card className="border-border bg-[#1E1E1E]">
                <CardHeader>
                  <CardTitle className="text-base">Passo 3 — Configurações de Comunicação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Modo de envio</Label>
                    <RadioGroup
                      value={communicationMode}
                      onValueChange={(v) => setCommunicationMode(v as "manual" | "auto")}
                      className="grid gap-3 sm:grid-cols-2"
                    >
                      <label
                        className={cn(
                          "flex cursor-pointer flex-col gap-2 rounded-lg border p-4 transition-colors",
                          communicationMode === "manual"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="manual" id="manual" />
                          <span className="font-medium">Revisão Manual</span>
                          <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                            Recomendado
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Você valida a tradução antes do envio.
                        </p>
                      </label>
                      <label
                        className={cn(
                          "flex cursor-pointer flex-col gap-2 rounded-lg border p-4 transition-colors",
                          communicationMode === "auto"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="auto" id="auto" />
                          <span className="font-medium">Automação Total</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          O sistema informa o cliente instantaneamente.
                        </p>
                      </label>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label>Fase do Processo</Label>
                    <Select value={faseInicial} onValueChange={setFaseInicial}>
                      <SelectTrigger className="border-border bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FASES_PROCESSO.map((fase) => (
                          <SelectItem key={fase.value} value={fase.value}>
                            {fase.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Define o ponto de partida na barra de progresso visual do cliente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar de Limites */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-border bg-[#1E1E1E]">
              <CardHeader>
                <CardTitle className="text-base">Seu Plano</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Uso atual do plano Solo
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold" style={{ color: "#FFC107" }}>
                    {activeProcesses} de {planLimit}
                  </p>
                  <p className="text-sm text-muted-foreground">processos ativos</p>
                </div>
                <Progress value={progressPercent} className="h-2" />
                <Button
                  variant="hero"
                  size="lg"
                  disabled={!isButtonEnabled}
                  className="w-full bg-primary py-6 text-base text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleConfirm}
                >
                  Iniciar Monitoramento
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdicionarProcesso;
