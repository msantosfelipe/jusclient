export interface DemoSessionData {
  lawyerName: string;
  lawFirm: string;
  email: string;
  currentStep: number;
  totalSteps: number;
}

export interface DemoAddedProcessData {
  processNumber: string;
  processNickname: string;
  clientName: string;
  clientEmail: string;
  clientWhatsapp: string;
  ultimaMovimentacao: string;
  dataUltimaMovimentacao: string;
  tribunal: string;
  vara: string;
  assunto: string;
}

const DEMO_SESSION_KEY = "jusclient_demo_session";
const DEMO_ADDED_PROCESS_KEY = "jusclient_demo_added_process";

export const demoSessionService = {
  // Inicializar sessão de demo
  initializeDemo: (data: Omit<DemoSessionData, "currentStep" | "totalSteps">) => {
    const demoData: DemoSessionData = {
      ...data,
      currentStep: 1,
      totalSteps: 5,
    };
    sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(demoData));
    return demoData;
  },

  // Obter dados da sessão
  getDemoSession: (): DemoSessionData | null => {
    const data = sessionStorage.getItem(DEMO_SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Avançar para próximo passo
  nextStep: (): DemoSessionData | null => {
    const current = demoSessionService.getDemoSession();
    if (!current) return null;
    if (current.currentStep < current.totalSteps) {
      current.currentStep += 1;
      sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(current));
    }
    return current;
  },

  // Voltar para passo anterior
  previousStep: (): DemoSessionData | null => {
    const current = demoSessionService.getDemoSession();
    if (!current) return null;
    if (current.currentStep > 1) {
      current.currentStep -= 1;
      sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(current));
    }
    return current;
  },

  // Limpar sessão (inclui processo adicionado na demo)
  clearDemoSession: () => {
    sessionStorage.removeItem(DEMO_SESSION_KEY);
    sessionStorage.removeItem(DEMO_ADDED_PROCESS_KEY);
  },

  // --- Processo adicionado na demo (após "Iniciar Monitoramento") ---
  getDemoAddedProcess: (): DemoAddedProcessData | null => {
    const data = sessionStorage.getItem(DEMO_ADDED_PROCESS_KEY);
    return data ? JSON.parse(data) : null;
  },

  setDemoAddedProcess: (data: DemoAddedProcessData) => {
    sessionStorage.setItem(DEMO_ADDED_PROCESS_KEY, JSON.stringify(data));
  },

  // Definir step específico
  setStep: (step: number): DemoSessionData | null => {
    const current = demoSessionService.getDemoSession();
    if (!current) return null;
    current.currentStep = Math.max(1, Math.min(step, current.totalSteps));
    sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(current));
    return current;
  },
};
