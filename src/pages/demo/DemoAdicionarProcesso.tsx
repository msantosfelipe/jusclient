import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Search, ChevronRight, ChevronLeft } from "lucide-react";
import { demoSessionService, DemoSessionData } from "@/lib/demoSession";

const DEMO_ADD_PROCESS_STORAGE_KEY = "jusclient_demo_add_process_form";

const TOTAL_DEMO_STEPS = 4;

export interface SearchResultData {
  tribunal: string;
  vara: string;
  classe: string;
  assunto: string;
  distribuicao: string;
  ultimaMovimentacao: string;
  dataUltimaMovimentacao: string;
}

export interface DemoAddProcessFormState {
  processNumber: string;
  searchResult: SearchResultData | null;
  selectedClient: string;
  clientEmail: string;
  clientWhatsapp: string;
  processNickname: string;
}

const initialFormState: DemoAddProcessFormState = {
  processNumber: "",
  searchResult: null,
  selectedClient: "",
  clientEmail: "",
  clientWhatsapp: "",
  processNickname: "",
};

const formatProcessNumber = (value: string) => {
  const numbers = value.replace(/\D/g, "").slice(0, 20);
  return numbers
    .replace(/^(\d{7})(\d)/, "$1-$2")
    .replace(/^(\d{7}-\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{7}-\d{2}\.\d{4})(\d)/, "$1.$2")
    .replace(/^(\d{7}-\d{2}\.\d{4}\.\d)(\d)/, "$1.$2")
    .replace(/^(\d{7}-\d{2}\.\d{4}\.\d\.\d{2})(\d)/, "$1.$2");
};

/** Máscara (00) 00000-0000 */
const formatWhatsApp = (value: string) => {
  const numbers = value.replace(/\D/g, "").slice(0, 11);
  if (numbers.length <= 2) return numbers ? `(${numbers}` : "";
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
};

function loadFormFromStorage(): DemoAddProcessFormState {
  try {
    const raw = sessionStorage.getItem(DEMO_ADD_PROCESS_STORAGE_KEY);
    if (!raw) return initialFormState;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const sr = parsed.searchResult as SearchResultData | null;
    const searchResult =
      sr && typeof sr === "object"
        ? {
            tribunal: sr.tribunal ?? "",
            vara: sr.vara ?? "",
            classe: sr.classe ?? "",
            assunto: sr.assunto ?? "",
            distribuicao: sr.distribuicao ?? "",
            ultimaMovimentacao: sr.ultimaMovimentacao ?? "",
            dataUltimaMovimentacao: sr.dataUltimaMovimentacao ?? "",
          }
        : null;
    return {
      processNumber: (parsed.processNumber as string) ?? "",
      searchResult,
      selectedClient: (parsed.selectedClient as string) ?? "",
      clientEmail: (parsed.clientEmail as string) ?? "",
      clientWhatsapp: (parsed.clientWhatsapp as string) ?? "",
      processNickname: (parsed.processNickname as string) ?? "",
    };
  } catch {
    return initialFormState;
  }
}

function saveFormToStorage(state: DemoAddProcessFormState) {
  sessionStorage.setItem(DEMO_ADD_PROCESS_STORAGE_KEY, JSON.stringify(state));
}

type DemoStep = 1 | 2 | 3 | 4;

const DEMO_STEPS: Record<
  DemoStep,
  { title: string; description: string; action?: string }
> = {
  1: {
    title: "Buscar Processo",
    description:
      "Informe o número do processo no padrão CNJ e clique em Realizar Busca. O sistema consultará os dados do processo no tribunal.",
    action: "Buscar",
  },
  2: {
    title: "Vincular Cliente",
    description:
      "Selecione a parte do processo que você representa: autor ou réu. Esse cliente receberá as atualizações simplificadas no Jusclient.",
    action: "Vincular",
  },
  3: {
    title: "Dados de Contato do Cliente",
    description:
      "Informe o e-mail e o WhatsApp do cliente para notificações e atualizações do processo.",
    action: "Contato",
  },
  4: {
    title: "Apelido do Processo",
    description:
      "Defina um apelido para identificar este processo no seu painel.",
    action: "Apelido",
  },
};

const DEMO_PARTES = [
  { value: "autor", label: "João da Silva (Autor)" },
  { value: "reu", label: "Empresa XPTO LTDA (Réu)" },
] as const;

const DemoAdicionarProcesso = () => {
  const navigate = useNavigate();
  const [demoSession, setDemoSession] = useState<DemoSessionData | null>(null);
  const [currentStep, setCurrentStep] = useState<DemoStep>(1);

  const [processNumber, setProcessNumber] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResultData | null>(null);
  const [searching, setSearching] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientWhatsapp, setClientWhatsapp] = useState("");
  const [processNickname, setProcessNickname] = useState("");

  // Carrega sessão de demo e formulário do session storage
  useEffect(() => {
    const session = demoSessionService.getDemoSession();
    if (!session) {
      navigate("/");
      return;
    }
    setDemoSession(session);
    const saved = loadFormFromStorage();
    setProcessNumber(saved.processNumber);
    setSearchResult(saved.searchResult);
    setSelectedClient(saved.selectedClient);
    setClientEmail(saved.clientEmail);
    setClientWhatsapp(saved.clientWhatsapp);
    setProcessNickname(saved.processNickname);
  }, [navigate]);

  useEffect(() => {
    if (!demoSession) return;
    saveFormToStorage({
      processNumber,
      searchResult,
      selectedClient,
      clientEmail,
      clientWhatsapp,
      processNickname,
    });
  }, [demoSession, processNumber, searchResult, selectedClient, clientEmail, clientWhatsapp, processNickname]);

  const handleSearch = () => {
    if (!processNumber.trim()) return;
    setSearching(true);
    setTimeout(() => {
      const result: SearchResultData = {
        tribunal: "TJBA - Tribunal de Justiça da Bahia",
        vara: "2ª Vara Cível de Salvador",
        classe: "Procedimento Comum",
        assunto: "Indenização por danos morais",
        distribuicao: "12/03/2023",
        ultimaMovimentacao: "Contestação apresentada",
        dataUltimaMovimentacao: "05/02/2025",
      };
      setSearchResult(result);
      setSearching(false);
    }, 800);
  };

  const isStep2Visible = searchResult !== null;
  const isStep3Visible = selectedClient !== "";
  const isStep4Visible = selectedClient !== "";

  const allFieldsFilled =
    processNumber.trim() !== "" &&
    searchResult !== null &&
    selectedClient !== "" &&
    clientEmail.trim() !== "" &&
    clientWhatsapp.replace(/\D/g, "").length >= 10 &&
    processNickname.trim() !== "";
  const isButtonEnabled = currentStep === TOTAL_DEMO_STEPS && allFieldsFilled;

  const handleConfirm = () => {
    navigate("/demo/dashboard");
  };

  const progressPercent = demoSession ? (currentStep / TOTAL_DEMO_STEPS) * 100 : 0;

  const handleNextStep = () => {
    if (currentStep < TOTAL_DEMO_STEPS) setCurrentStep((s) => (s + 1) as DemoStep);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep((s) => (s - 1) as DemoStep);
  };

  if (!demoSession) {
    return null;
  }

  const stepContent = DEMO_STEPS[currentStep];

  const GuideCard = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
    >
      <div className="rounded-lg border border-border bg-[#1E1E1E] p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <span className="text-sm font-semibold text-primary">{currentStep}</span>
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              Passo {currentStep} de {TOTAL_DEMO_STEPS}
            </p>
          </div>
        </div>
        <h3 className="text-base font-semibold text-foreground mb-3">
          {stepContent.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {stepContent.description}
        </p>
        <div className="mb-4">
          <Progress value={progressPercent} className="h-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleNextStep}
            className="gap-1 w-full"
            disabled={currentStep === TOTAL_DEMO_STEPS}
          >
            Próximo
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
            className="gap-1 w-full"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const activeProcesses = 0;
  const planLimit = 30;
  const planProgressPercent = (activeProcesses / planLimit) * 100;

  return (
    <DashboardLayout
      lawyerName={demoSession.lawyerName}
      disableMenu={true}
      addProcessEnabled={false}
      addProcessTo="/demo/adicionar-processo"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Vincular Novo Processo</h1>
            <Link
              to="/demo/dashboard"
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
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
                      onChange={(e) => {
                        const formatted = formatProcessNumber(e.target.value);
                        setProcessNumber(formatted);
                      }}
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
                        <span className="text-muted-foreground">Classe:</span>{" "}
                        <span className="font-medium">{searchResult.classe}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Assunto:</span>{" "}
                        <span className="font-medium" style={{ color: "#FFC107" }}>
                          {searchResult.assunto}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Distribuição:</span>{" "}
                        <span className="font-medium">{searchResult.distribuicao}</span>
                      </p>
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm">
                          <span className="text-muted-foreground">Última movimentação:</span>{" "}
                          <span className="font-medium">{searchResult.ultimaMovimentacao}</span>
                        </p>
                        <p className="text-sm mt-1">
                          <span className="text-muted-foreground">Data da última movimentação:</span>{" "}
                          <span className="font-medium">{searchResult.dataUltimaMovimentacao}</span>
                        </p>
                      </div>
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
                    <Label>Parte do processo</Label>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger className="border-border bg-background">
                        <SelectValue placeholder="Selecione a parte que você representa" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEMO_PARTES.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Autor ou réu receberá as atualizações simplificadas no Jusclient.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Passo 3 - Dados de contato do cliente */}
            {isStep3Visible && (
              <Card className="border-border bg-[#1E1E1E]">
                <CardHeader>
                  <CardTitle className="text-base">
                    Passo 3 — Dados de Contato do Cliente
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Inclua o e-mail e o WhatsApp para notificações
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-email">E-mail</Label>
                    <Input
                      id="client-email"
                      type="email"
                      placeholder="cliente@exemplo.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-whatsapp">WhatsApp</Label>
                    <Input
                      id="client-whatsapp"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={clientWhatsapp}
                      onChange={(e) => setClientWhatsapp(formatWhatsApp(e.target.value))}
                      className="bg-background font-mono"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Passo 4 - Apelido do processo */}
            {isStep4Visible && (
              <Card className="border-border bg-[#1E1E1E]">
                <CardHeader>
                  <CardTitle className="text-base">
                    Passo 4 — Apelido do Processo
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Nome para identificar o processo no seu painel
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="process-nickname">Apelido do processo</Label>
                    <Input
                      id="process-nickname"
                      type="text"
                      placeholder="Ex: Ação indenização João"
                      value={processNickname}
                      onChange={(e) => setProcessNickname(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>


          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-border bg-[#1E1E1E]">
              <CardHeader>
                <CardTitle className="text-base">Seu Plano</CardTitle>
                <p className="text-sm text-muted-foreground">Uso atual do plano Solo</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold" style={{ color: "#FFC107" }}>
                    {activeProcesses} de {planLimit}
                  </p>
                  <p className="text-sm text-muted-foreground">processos ativos</p>
                </div>
                <Progress value={planProgressPercent} className="h-2" />
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

        <div className="mb-32" />
        <GuideCard />
      </div>
    </DashboardLayout>
  );
};

export default DemoAdicionarProcesso;
