import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  X,
  Plus,
} from "lucide-react";
import { demoSessionService, DemoSessionData } from "@/lib/demoSession";

type DemoStep = 1 | 2 | 3 | 4 | 5;

interface DemoGuideContent {
  title: string;
  description: string;
  highlightElement?: string;
  action?: string;
}

const DEMO_STEPS: Record<DemoStep, DemoGuideContent> = {
  1: {
    title: "Bem-vindo ao Dashboard",
    description:
      "Aqui você acompanha todos os seus processos, clientes e métricas importantes. Vamos começar explorando os dados principais.",
    action: "Ver Resumo",
  },
  2: {
    title: "Seus Processos",
    description:
      "Nesta seção, você gerencia todos os processos vinculados. Cada um mostra o cliente, número do processo e estágio atual.",
    action: "Explorar Processos",
  },
  3: {
    title: "Seus Clientes",
    description:
      "Veja todos os seus clientes, quantos processos cada um tem, frequência de acesso e comunique-se diretamente com eles.",
    action: "Ver Clientes",
  },
  4: {
    title: "Feed de Atualizações",
    description:
      "Aqui chegam as movimentações do processo. Você traduz para linguagem simples e o cliente recebe notificado.",
    action: "Gerenciar Feed",
  },
  5: {
    title: "Gestão de Ansiedade",
    description:
      "Monitore clientes que acessam muito a plataforma. Aqui você envia mensagens proativas para acalmar e manter tudo transparente.",
    action: "Finalizar Demo",
  },
};

const DemoDashboard = () => {
  const navigate = useNavigate();
  const [demoSession, setDemoSession] = useState<DemoSessionData | null>(null);
  const [showFinalPopup, setShowFinalPopup] = useState(false);

  useEffect(() => {
    const session = demoSessionService.getDemoSession();
    if (!session) {
      navigate("/");
      return;
    }
    setDemoSession(session);
  }, [navigate]);

  const handleNextStep = async () => {
    // Simular carregamento de dados
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (isLastStep) {
      // Se for o último step, mostrar popup final
      setShowFinalPopup(true);
    } else {
      // Caso contrário, avançar para o próximo step
      const updatedSession = demoSessionService.nextStep();
      if (updatedSession) {
        setDemoSession(updatedSession);
      }
      window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    }
  };

  const handlePreviousStep = () => {
    const updatedSession = demoSessionService.previousStep();
    if (updatedSession) {
      setDemoSession(updatedSession);
    }
  };

  const handleExitDemo = () => {
    demoSessionService.clearDemoSession();
    navigate("/");
  };

  if (!demoSession) {
    return null;
  }

  const currentStep = demoSession.currentStep as DemoStep;
  const stepContent = DEMO_STEPS[currentStep];
  const progressPercent = (currentStep / demoSession.totalSteps) * 100;
  const isLastStep = currentStep === demoSession.totalSteps;

  // Componente de guia que aparece como popup ao lado de um card
  const GuideCard = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
    >
      <div className="rounded-lg border border-border bg-[#1E1E1E] p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <span className="text-sm font-semibold text-primary">{currentStep}</span>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Passo {currentStep} de {demoSession.totalSteps}
              </p>
            </div>
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

        <div className="flex gap-2 flex-col">
          <Button
            variant="default"
            size="sm"
            onClick={handleNextStep}
            className="gap-1 w-full"
          >
            {isLastStep ? "Próxima Etapa" : "Próximo"}
            {!isLastStep && <ChevronRight className="h-4 w-4" />}
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

  // Popup final quando termina a demo
  const FinalPopup = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-20 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]"
    >
      <div className="rounded-lg border border-border bg-[#1E1E1E] p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              🎉 Parabéns!
            </h3>
            <p className="text-xs font-medium text-muted-foreground mt-1">
              Você finalizou a demonstração do Dashboard
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Agora clique no botão <strong>"Adicionar Processo"</strong> para começar a criar seu primeiro processo no Jusclient.
        </p>
        <div className="mb-4"></div>
        <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFinalPopup(false)}
            className="gap-1 w-full"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
        </Button>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout
      lawyerName={demoSession.lawyerName}
      disableMenu={true}
      addProcessEnabled={showFinalPopup}
      addProcessTo="/demo/adicionar-processo"
    >
      <div className="space-y-8">
        {/* Empty State Content */}
        <div className="space-y-8 mb-32">
          {/* Step 1: Resumo */}
          {currentStep >= 1 && (
            <div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Processos Ativos",
                    value: "—",
                    subtext: "Plano Solo",
                    icon: "📋",
                  },
                  {
                    title: "Atualizações Hoje",
                    value: "—",
                    subtext: "Últimas 24h",
                    icon: "🔔",
                  },
                  {
                    title: "Tempo Economizado",
                    value: "—",
                    subtext: "Estimativa com automação",
                    icon: "⏱️",
                  },
                ].map((card, i) => (
                  <Card
                    key={i}
                    className={`border-border bg-[#1E1E1E] transition-all ${
                      currentStep >= 1 ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {card.title}
                        </CardTitle>
                        <span className="text-2xl">{card.icon}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">
                        {card.value}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {card.subtext}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Meus Processos */}
          {currentStep >= 2 && (
            <Card className="border-border bg-[#1E1E1E]">
              <CardHeader>
                <CardTitle>Meus Processos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">
                    Aqui você verá uma lista dos seus processos quando começar a adicionar clientes.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Meus Clientes */}
          {currentStep >= 3 && (
            <Card className="border-border bg-[#1E1E1E]">
              <CardHeader>
                <CardTitle>Meus Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">
                    A lista de clientes aparecerá aqui quando você criar convites.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Feed de Atualizações */}
          {currentStep >= 4 && (
            <Card className="border-border bg-[#1E1E1E]">
              <CardHeader>
                <CardTitle>Feed de Atualizações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">
                    As movimentações do processo chegarão nesta seção.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Gestão de Ansiedade */}
          {currentStep >= 5 && (
            <Card className="border-border bg-[#1E1E1E]">
              <CardHeader>
                <CardTitle>Gestão de Ansiedade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">
                    Clientes com alta frequência de acesso aparecerão aqui.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Guide Card Popup */}
        {!showFinalPopup && <GuideCard />}

        {/* Final Popup */}
        {showFinalPopup && <FinalPopup />}
      </div>
    </DashboardLayout>
  );
};

export default DemoDashboard;
