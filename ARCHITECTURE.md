# ARCHITECTURE.md — Jusclient: Documentação Técnica Completa

## 1. Visão Geral do Jusclient

O **Jusclient** é uma plataforma SaaS que democratiza a comunicação jurídica entre advogados e clientes através da tradução automática de termos técnicos para linguagem acessível e automação de notificações processuais.

### Missão
Reduzir a ansiedade dos clientes em processos judicais e aumentar a produtividade dos advogados ao eliminar o "bombardeio de mensagens" (redução estimada de 70% em perguntas repetitivas).

### Proposta de Valor
- **Para Advogados:** Dashboard centralizado de clientes, gerenciamento de processos, automação de comunicação, selo de "Comunicação Transparente"
- **Para Clientes:** Acompanhamento visual do processo, explicações em linguagem simples, notificações contextualizadas, redução da ansiedade

### Modelo Multi-Tenant
Cada escritório de advocacia opera como um tenant isolado com limites de processos por plano:
- **Solo:** 30 processos ativos (advogado autônomo)
- **Escritório:** 200 processos ativos (até 5 advogados)
- **Enterprise:** 1.000 processos ativos (até 20 advogados)
- **Institucional:** Ilimitado (órgãos públicos)

---

## 2. Stack Tecnológica

### Front-End
| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| **React** | 18+ | Framework UI principal |
| **TypeScript** | 5+ | Tipagem estática |
| **Vite** | - | Build tool e dev server |
| **React Router DOM** | v6 | Roteamento client-side |
| **Tailwind CSS** | 3+ | Estilização utility-first |
| **Framer Motion** | - | Animações e transições |
| **shadcn/ui** | - | Componentes reutilizáveis (Radix UI) |
| **Lucide React** | - | Ícones SVG |
| **React Hook Form** | - | Gerenciamento de formulários |
| **Zod** | - | Validação de schemas |
| **TanStack React Query** | - | State management (servidor) |
| **Sonner + Toaster** | - | Notificações toast |

### Ferramentas de Desenvolvimento
- **ESLint:** Linting e qualidade de código
- **Vitest:** Unit testing
- **PostCSS:** Pré-processamento CSS
- **Bun:** Package manager alternativo

### Observações Arquiteturais
- Projeto **SPA (Single Page Application)** com React Router
- Sem framework meta (Next.js) — apenas Vite + React vanilla
- Estado global gerenciado via React Query (para dados remotos) e hooks customizados
- Sem banco de dados real — todos os dados são mockados em memória

---

## 3. Design System

### 3.1 Paleta de Cores

#### Cores Primárias
| Token | HSL | HEX | Uso |
|-------|-----|-----|-----|
| **--background** | `0 0% 6%` | `#0F0F0F` | Fundo principal (dark mode) |
| **--surface** | `0 0% 12%` | `#1E1E1E` | Cards e superfícies |
| **--card** | `0 0% 12%` | `#1E1E1E` | Cards individuais |
| **--foreground** | `0 0% 100%` | `#FFFFFF` | Texto principal |
| **--muted-foreground** | `240 5% 65%` | `#A1A1AA` | Texto secundário |
| **--border** | `0 0% 18%` | `#2E2E2E` | Bordas e separadores |

#### Cores de Acentuação
| Token | HSL | HEX | Uso |
|-------|-----|-----|-----|
| **--primary** | `45 100% 51%` | `#FFC107` | Amarelo Ouro — CTAs principais, badges, destaque |
| **--secondary** | `38 92% 50%` | `#F59E0B` | Amarelo Escuro — progresso, status |
| **--destructive** | `0 84% 60%` | `#EF4444` | Vermelho — erros, ações perigosas |
| **--success** | `142 71% 45%` | `#22C55E` | Verde — sucesso, ações completadas |
| **--warning** | `38 92% 50%` | `#F59E0B` | Amarelo — avisos |

#### Gradientes Customizados
```css
.text-gradient-primary {
  background: linear-gradient(to right, #FFC107, #F59E0B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glow-primary {
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.3);
}

.animate-pulse-glow {
  animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### 3.2 Tipografia

| Aspecto | Valor |
|--------|-------|
| **Fonte Principal** | Inter (Google Fonts) |
| **Pesos Utilizados** | 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold) |
| **Escala de Tamanho** | Baseada em Tailwind (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl) |

#### Estilos de Texto Comuns
```tsx
// Heading 1 (Landing Page)
className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"

// Heading 2 (Seções)
className="text-3xl md:text-4xl font-bold"

// Heading 3 (Subsections)
className="text-2xl font-bold"

// Texto Principal
className="text-base leading-relaxed text-foreground"

// Texto Secundário
className="text-sm text-muted-foreground"

// Label/Badge
className="text-xs font-semibold uppercase tracking-widest"
```

### 3.3 Espaçamento e Layout

| Conceito | Valor Tailwind | Pixels |
|----------|----------------|--------|
| **Border Radius Padrão** | `rounded-lg` | 12px |
| **Padding Card** | `p-6 md:p-8` | 24px / 32px |
| **Gap entre elementos** | `gap-4`, `gap-6`, `gap-8` | 16px, 24px, 32px |
| **Margin Section** | `py-24 px-4` | 96px vertical, 16px horizontal |

### 3.4 Padrões de Componentes

#### Card Surface
```tsx
className="card-surface p-6 md:p-8"
// Equivalente: bg-[#1E1E1E] border border-[#2E2E2E] rounded-lg
```

#### Button Primary (CTA)
```tsx
className="bg-[#FFC107] text-black hover:bg-[#FFD54F] font-semibold"
// Amarelo Ouro com hover mais claro
```

#### Badge Status
```tsx
className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium"
// Fundo transparente do primary, texto em cores específicas
```

#### Progress Bar
```tsx
// 3 estágios (petição, provas, sentença)
className="h-2 flex-1 rounded-sm"
// Preenchido em #FFC107, não preenchido em #2E2E2E
```

---

## 4. Estrutura de Páginas e Rotas

### 4.1 Mapa de Rotas Completo

```
/                              Landing Page (Public)
├── /login                      Login Advogado
├── /login-cliente              Login Cliente
├── /cadastro                   Cadastro Advogado (Planos)
│
├── /dashboard                  Dashboard Principal (Advogado)
├── /dashboard/processos        Listagem de Processos
├── /dashboard/processos/:id    Detalhes do Processo (Curadoria)
├── /dashboard/adicionar-processo Vinculação de Novo Processo
├── /dashboard/clientes         Gerenciamento de Clientes
├── /dashboard/assinatura       Assinatura e Limites (Em Breve)
├── /dashboard/configuracoes    Configurações (Em Breve)
│
├── /cliente/casos              Meus Casos (Cliente)
├── /cliente/casos/:id          Detalhes do Caso (Cliente)
│
└── /*                          Página 404 (Not Found)
```

### 4.2 Estrutura de Arquivos

```
src/
├── pages/
│   ├── Index.tsx              Landing Page
│   ├── Login.tsx              Login Advogado
│   ├── LoginCliente.tsx       Login Cliente
│   ├── Cadastro.tsx           Cadastro com Seleção de Plano
│   ├── Dashboard.tsx          Dashboard Principal (Feed de Atualizações)
│   ├── NotFound.tsx           Página 404
│   │
│   └── dashboard/
│       ├── Processos.tsx      Listagem de Processos
│       ├── DetalhesProcesso.tsx Detalhes com Tradução
│       ├── AdicionarProcesso.tsx Vinculação + Configuração
│       ├── Clientes.tsx       Gestão de Clientes
│       ├── Assinatura.tsx     Plano (placeholder)
│       └── Configuracoes.tsx  Configurações (placeholder)
│
│   └── cliente/
│       ├── MeusCasos.tsx      Lista de Casos
│       └── DetalhesProcessoCliente.tsx Detalhes + Timeline
│
├── layouts/
│   ├── DashboardLayout.tsx    Layout Advogado (Sidebar + Header)
│   └── ClientLayout.tsx       Layout Cliente (Header simples)
│
├── components/
│   ├── ui/                    shadcn/ui customizados
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── sheet.tsx
│   │   ├── select.tsx
│   │   ├── radio-group.tsx
│   │   └── textarea.tsx
│   │
│   ├── landing/
│   │   ├── HeroSection.tsx    Seção Principal
│   │   ├── ProblemSolutionSection.tsx Problema → Solução
│   │   ├── TranslatorSection.tsx Antes/Depois
│   │   ├── NetworkEffectSection.tsx Efeito de Rede + Selo
│   │   ├── PricingSection.tsx Tabela de Preços
│   │   └── Footer.tsx         Rodapé
│   │
│   ├── PageLoadingIndicator.tsx Global page loader
│   └── NavLink.tsx            Link com ativo
│
├── hooks/
│   ├── use-mobile.tsx         Detecção de screen mobile
│   └── use-toast.ts           Hook para notificações
│
├── lib/
│   └── utils.ts               Funções utilitárias (cn, etc)
│
├── App.tsx                    Router Setup
├── App.css                    Estilos globais (deprecated)
├── main.tsx                   Entry point
├── index.css                  Tailwind import
└── vite-env.d.ts             Tipos Vite

public/
└── robots.txt

tailwind.config.ts             Configuração Tailwind
vite.config.ts                 Configuração Vite
vitest.config.ts              Configuração Vitest
tsconfig.json                 Configuração TypeScript
```

---

## 5. Fluxos de Usuário (User Flows)

### 5.1 Fluxo do Advogado (Lawyer Flow)

#### 5.1.1 Autenticação e Setup
```
1. Landing Page
   ↓
2. Clica em "Sou advogado"
   ↓
3. /login
   - Email + Senha (mock — redireciona direto para /dashboard)
   ↓
4. /dashboard (Feed Principal)
```

#### 5.1.2 Adição de Novo Processo
```
1. /dashboard/adicionar-processo
   ↓
2. Passo 1: Busca do Processo
   - Input: Número do Processo (ex: 0001234-56.2024.8.05.0001)
   - Button: "Buscar no Tribunal"
   - Mock: Retorna Tribunal, Vara, Assunto
   ↓
3. Passo 2: Vincular Cliente
   - Select: Escolher cliente existente
   - Hint: "Este cliente receberá as atualizações"
   ↓
4. Passo 3: Configurar Comunicação
   - RadioGroup: "Revisão Manual" (recomendado) ou "Automação Total"
   ↓
5. Sidebar: Exibir Limite do Plano
   - 12 de 30 processos ativos (Solo)
   - Progress bar visual
   ↓
6. Button: "Iniciar Monitoramento"
   ↓
7. Redireciona: /dashboard/processos
```

#### 5.1.3 Curadoria de Tradução (Dashboard Principal)
```
1. /dashboard (Feed de Atualizações)
   - Cards mostrando: Cliente, Processo, Fase, Explicação
   - Status: Visível/Oculto para o cliente
   ↓
2. Clica em Card de Atualização
   ↓
3. Modal: Revisão de Tradução
   - Esquerda: "Texto Jurídico Original (PJe)"
     Ex: "Conclusos para despacho..."
   - Direita: "Tradução Jusclient"
     Campo editável com tradução
   ↓
4. Ações:
   - [Ocultar Movimentação] — não mostra ao cliente
   - [Enviar para Cliente] — confirma e envia
   ↓
5. Card atualizado: Status "Enviada ao Inbox do Cliente"
```

#### 5.1.4 Gerenciamento de Clientes
```
1. /dashboard/clientes
   ↓
2. Stats Cards:
   - Total de Clientes: N
   - Clientes Ativos: N
   - Clientes Inativos: N
   ↓
3. Grid de Clientes:
   - Card cada cliente
   - Info: Nome, Email, Telefone, Status de Acesso
   - Botão: "Ver Detalhes"
   ↓
4. Modal Detalhes:
   - Dados de contato
   - Processos vinculados
   - Gráfico: Frequência de Acessos (últimas 4 semanas)
   - Botões: "Reenviar Convite", "Gerar Relatório de Transparência"
```

#### 5.1.5 Listagem e Detalhes de Processos
```
1. /dashboard/processos
   ↓
2. Filtros:
   - Search: Por cliente ou número do processo
   - Abas: Todos / Pendentes / Concluídos
   ↓
3. Tabela de Processos:
   Colunas: Cliente | Processo | Fase | Última Mensagem | Status
   ↓
4. Clica em linha → /dashboard/processos/:id
   ↓
5. Detalhes do Processo
   - Header: Cliente | Apelido do Processo
   - Info: Número, Tribunal, Última Atualização
   ↓
6. Timeline de Progresso:
   - Círculos conectados: Petição → Instrução → Sentença → Recurso
   - Preenchimento indica fase atual
   ↓
7. Movimentações (Histórico):
   - Cards em grid 2 colunas
   - Lado esquerdo: "Termo Técnico (PJe)"
   - Lado direito: "Tradução Jusclient"
   - Status: Enviada / Aguardando Revisão
   - Badge: Oculta (se escondida do cliente)
   ↓
8. Ações por Movimentação:
   - Dropdown Menu: Editar, Ocultar/Exibir do Cliente
```

### 5.2 Fluxo do Cliente (Hub Jurídico)

#### 5.2.1 Autenticação
```
1. Landing Page → "Acompanhar meus processos"
   ↓
2. /login-cliente
   - Email + Senha (mock — redireciona direto)
   ↓
3. /cliente/casos (Meus Casos)
```

#### 5.2.2 Visualização de Casos
```
1. /cliente/casos
   - Header: "Olá, João. Veja o andamento dos seus casos..."
   - Contador: "3 casos sendo gerenciados"
   ↓
2. Grid de Cards (Casos):
   Cada card mostra:
   - Apelido do Caso
   - Nome do Advogado + Ícone Dourado
   - Badge: Status (Petição Inicial / Fase de Provas / etc)
   - Progress Bar: 4 estágios visuais
   - Última Atualização (texto)
   - Button: "Ver Detalhes do Caso"
   ↓
3. Clica em card → /cliente/casos/:id
```

#### 5.2.3 Detalhes do Caso (Timeline Jurídica)
```
1. /cliente/casos/:id
   ↓
2. Header:
   - Título do Caso (grande, amarelo)
   - Número do processo (cinza pequeno)
   - Badge: "Ativo"
   ↓
3. Advogado Info:
   - Icon + Nome + Email
   ↓
4. Card: "Onde meu processo está?"
   - 4 circles representando estágios
   - Preenchimento visual em amarelo até estágio atual
   - Labels: Petição / Provas / Sentença / Conclusão
   ↓
5. Card: "Última Atualização" (Destaque)
   - Border amarelo, fundo semi-transparente
   - Ícone AlertCircle
   - Título: Última Atualização
   - Descrição: Texto em linguagem simples
   - Parágrafo: Explicação contextuada
   ↓
6. Card: Mensagem do Advogado (se existir)
   - Avatar com iníciais
   - Conteúdo da mensagem em itálico
   - Data
   ↓
7. Card: "Inbox de Atualizações"
   - Timeline vertical
   - Cada item: Data | Título | Explicação
   - Ponto dourado conectado por linha
   ↓
8. Card: "Dúvidas Urgentes?"
   - Texto: "Entre em contato com seu advogado pelo canal oficial"
   - Hint: "O Jusclient é para informações do andamento"
```

---

## 6. Casos de Uso e Regras de Negócio

### 6.1 Limite de Processos

#### Regra
Cada plano possui um limite máximo de processos ativos. Quando o limite é atingido, o botão "Iniciar Monitoramento" fica desabilitado.

#### Implementação (Mock)
```typescript
// src/pages/dashboard/AdicionarProcesso.tsx
const activeProcesses = 12;
const planLimit = 30;
const progressPercent = (activeProcesses / planLimit) * 100;
const isButtonEnabled = activeProcesses < planLimit;

<Progress value={progressPercent} className="h-2" />
<Button
  disabled={!isButtonEnabled}
  className="disabled:opacity-50 disabled:cursor-not-allowed"
>
  Iniciar Monitoramento
</Button>
```

#### Planos
| Plano | Limite | Advogados |
|-------|--------|-----------|
| Solo | 30 | 1 |
| Escritório | 200 | 5 |
| Enterprise | 1.000 | 20 |
| Institucional | Ilimitado | Ilimitado |

### 6.2 Tradução Jurídica vs Texto Original

#### Propósito
Cada movimentação processual possui duas versões:
1. **Texto Original:** Termos jurídicos técnicos (PJe)
2. **Tradução Jusclient:** Linguagem simples e acessível

#### Fluxo de Aprovação
```
Estado: "Aguardando Revisão"
 ↓
Advogado edita tradução no modal
 ↓
Advogado clica "Enviar para Cliente"
 ↓
Estado: "Enviada ao Inbox do Cliente"
 ↓
Cliente vê apenas a "Tradução Jusclient" (nunca o Texto Original)
```

#### Exemplo Real
| Texto Original | Tradução Jusclient |
|---|---|
| "Conclusos para despacho. O juízo proferirá decisão nos termos do art. 487 do CPC." | "O processo está na mesa do juiz aguardando uma decisão sobre o próximo passo." |
| "Intimação da parte contrária para manifestação." | "O juiz pediu para a outra parte do processo se pronunciar sobre o assunto." |
| "Certidão de trânsito em julgado expedida." | "Não cabe mais nenhum recurso. A decisão do juiz é definitiva." |

### 6.3 Gestão de Ansiedade (Anxiety Alerts)

#### Propósito
Monitorar quanto o cliente está "ansiosos" visualizando a frequência de acessos na plataforma.

#### Status de Alerta
| Status | Condição | Cor | Ícone |
|--------|----------|-----|-------|
| **Estável** | Acessos normais | Verde | ✓ |
| **Atento** | Acessos moderados ou aumento | Amarelo | ⚠ |
| **Crítico** | Acessos muito frequentes (indicador de ansiedade) | Vermelho | 🔴 |

#### Implementação (Mock)
```typescript
// src/pages/Dashboard.tsx
const ANXIETY_ALERTS = [
  { client: "Maria Fernanda Santos", processNickname: "Ação de Indenização", accesses: 12, status: "Crítico" },
  { client: "João Pedro Oliveira", processNickname: "Ação Trabalhista", accesses: 9, status: "Atento" },
];

const STATUS_BADGE_STYLES = {
  Estável: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Atento: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Crítico: "bg-red-500/20 text-red-400 border-red-500/30",
};
```

#### Ação Recomendada
Quando status é "Crítico" ou "Atento", advogado pode clicar em "Notificar Agora" para enviar uma mensagem proativa ao cliente.

### 6.4 Termómetro de Acessos (Access Frequency)

#### Propósito
Visualizar a frequência de acessos do cliente nas últimas 4 semanas para detectar padrões de ansiedade.

#### Gráfico
```typescript
// src/pages/dashboard/Clientes.tsx
const acessoFrequencia = [
  { semana: "Sem. 1", acessos: 2 },
  { semana: "Sem. 2", acessos: 5 },  // Pico
  { semana: "Sem. 3", acessos: 3 },
  { semana: "Sem. 4", acessos: 8 },  // Maior
];

// Renderização: Barras verticais com altura proporcional a acessos
```

### 6.5 Templates de Comunicação Proativa

#### Propósito
Advogado pode usar templates pré-configurados para enviar mensagens ao cliente de forma rápida e consistente.

#### Templates Disponíveis
```typescript
// src/pages/Dashboard.tsx
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
```

### 6.6 Visibilidade de Movimentação

#### Propósito
Advogado pode ocultar movimentações específicas do cliente quando julgador não apropriado ou estrategicamente sensível.

#### Estados
- **Visível para o Cliente:** Icon `<Eye />`, Cliente vê a tradução
- **Oculta do Cliente:** Icon `<EyeOff />`, Cliente não vê (apenas advogado)

#### Implementação
```typescript
// src/pages/Dashboard.tsx & DetalhesProcesso.tsx
const handleToggleVisibility = () => {
  setSelectedItem(prev => ({
    ...prev,
    visible: !prev.visible
  }));
};

{selectedItem?.visible ? (
  <Eye className="h-4 w-4 text-muted-foreground" />
) : (
  <EyeOff className="h-4 w-4 text-muted-foreground" />
)}
```

---

## 7. Modelagem de Dados (Mock Data)

### 7.1 Tipos TypeScript

#### Cliente (Advogado-side)
```typescript
// src/pages/dashboard/Clientes.tsx
type ClientStatus = "ativo" | "pendente";

type Cliente = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  processosCount: number;
  status: ClientStatus;                 // ativo | pendente
  lastAccess?: string;                  // "2 horas atrás"
  processos: {
    id: string;
    nome: string;
    numero: string;
  }[];
  acessoFrequencia: Array<{
    semana: string;
    acessos: number;
  }>;
};
```

#### Processo (Advogado-side)
```typescript
// src/pages/dashboard/Processos.tsx
type ProcessoItem = {
  id: string;
  client: string;
  processNickname: string;
  processNumber: string;
  progressStage: 1 | 2 | 3;              // Estágios visuais
  lastMessage: string;
  readByClient: boolean;
  status: "ativo" | "pendente" | "concluido";
};
```

#### Detalhes do Processo
```typescript
// src/pages/dashboard/DetalhesProcesso.tsx
type MessageStatus = "enviada" | "aguardando";

type Movimentacao = {
  id: string;
  technicalTerm: string;                 // Texto original PJe
  translation: string;                   // Tradução Jusclient
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
  currentPhase: number;                  // 1-4
  movimentacoes: Movimentacao[];
};
```

#### Caso do Cliente
```typescript
// src/pages/cliente/MeusCasos.tsx
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

interface CaseDetail extends Case {
  explicacao: string;
  timeline: Array<{
    data: string;
    titulo: string;
    explicacao: string;
  }>;
  mensagemAdvogado?: {
    data: string;
    conteudo: string;
  };
}
```

#### Atualização no Feed
```typescript
// src/pages/Dashboard.tsx
type FeedUpdateItem = {
  client: string;
  processNumber: string;
  impactExplanation: string;             // Resumo em linguagem simples
  processPhase: string;                  // "Análise do Juiz"
  expectedNextStep: string;              // "Expectativa: 15 dias..."
  legalText: string;                     // Texto original PJe
  visible: boolean;                      // Visível para cliente?
};
```

### 7.2 Mock Data Estruturado

#### Exemplo: Cliente
```typescript
const MOCK_CLIENTES = [
  {
    id: "1",
    nome: "Maria Fernanda Santos",
    email: "maria.santos@email.com",
    telefone: "(85) 98765-4321",
    processosCount: 2,
    status: "ativo",
    lastAccess: "2 horas atrás",
    processos: [
      { id: "p1", nome: "Ação de Indenização", numero: "0001234-56.2024.8.05.0001" },
      { id: "p2", nome: "Ação Trabalhista", numero: "0002456-78.2024.8.05.0002" },
    ],
    acessoFrequencia: [
      { semana: "Sem. 1", acessos: 2 },
      { semana: "Sem. 2", acessos: 5 },
      { semana: "Sem. 3", acessos: 3 },
      { semana: "Sem. 4", acessos: 8 },
    ],
  },
];
```

#### Exemplo: Processo Completo
```typescript
const MOCK_DETALHES = {
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
        technicalTerm: "Certificada a publicação da petição inicial no DJe.",
        translation: "Sua ação foi protocolada e publicada oficialmente.",
        status: "enviada",
        hiddenFromClient: false,
      },
      {
        id: "m2",
        technicalTerm: "Concedida a citação do réu por edital.",
        translation: "O réu foi notificado oficialmente sobre a ação.",
        status: "enviada",
        hiddenFromClient: false,
      },
    ],
  },
};
```

---

## 8. Diretrizes de Desenvolvimento

### 8.1 Padrões e Convenções

#### Nomenclatura
- **Páginas:** PascalCase, sufixo `.tsx` (ex: `src/pages/Dashboard.tsx`, `src/pages/cliente/MeusCasos.tsx`)
- **Componentes:** PascalCase, sufixo `.tsx` (ex: `src/components/landing/HeroSection.tsx`)
- **Hooks:** camelCase com prefixo `use-` (ex: `use-mobile.tsx`)
- **Funções utilitárias:** camelCase (ex: `cn()`)
- **Tipos:** PascalCase ou kebab-case (ex: `ProcessoDetail`, `MessageStatus`)

#### Estrutura de Componente
```typescript
// Padrão recomendado
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MyComponentProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

const MyComponent = ({ title, children, className }: MyComponentProps) => {
  return (
    <div className={cn("base-styles", className)}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
};

export default MyComponent;
```

### 8.2 Estilização

#### Usar Tailwind + Variáveis CSS
```tsx
// ✅ Recomendado
className="bg-background border-border text-foreground"
className="rounded-lg p-6 gap-4"

// ✅ Também recomendado (cores específicas)
className="bg-[#FFC107] text-black"
style={{ color: "#FFC107" }}

// ❌ Evitar
className="bg-yellow-500"  // Usar cores via variáveis
```

#### Componentes Reutilizáveis
```tsx
// ✅ Usar shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ❌ Evitar divs customizadas quando há equivalente shadcn
```

### 8.3 Estrutura de Páginas

#### Layout Base (Advogado)
```tsx
import DashboardLayout from "@/layouts/DashboardLayout";

const MyPage = () => {
  return (
    <DashboardLayout lawyerName="Dr. Carlos Silva">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Conteúdo */}
      </div>
    </DashboardLayout>
  );
};

export default MyPage;
```

#### Layout Base (Cliente)
```tsx
import ClientLayout from "@/layouts/ClientLayout";

const MyClientPage = () => {
  return (
    <ClientLayout clientName="João Silva">
      <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
        {/* Conteúdo */}
      </div>
    </ClientLayout>
  );
};

export default MyClientPage;
```

### 8.4 Roteamento

#### Adicionar Nova Rota
1. Criar arquivo `.tsx` em `src/pages` ou subdiretório
2. Exportar como default
3. Importar em `src/App.tsx`
4. Adicionar `<Route>` correspondente

```typescript
// src/App.tsx
import MyNewPage from "./pages/MyNewPage";

<Route path="/my-new-path" element={<MyNewPage />} />
```

### 8.5 State Management

#### Usar React Hooks (useState, useEffect)
```typescript
const [state, setState] = useState<string>("");
const [isLoading, setIsLoading] = useState(false);
```

#### Para Dados Remotos: React Query
```typescript
import { useQuery } from "@tanstack/react-query";

const { data, isLoading, error } = useQuery({
  queryKey: ["procesos"],
  queryFn: fetchProcessos,
});
```

#### Para Dados Globais: Context API (Futuro)
Ao integrar backend real, considerar Context para:
- Dados do usuário autenticado
- Configurações globais
- Tema (já tem dark mode via Tailwind)

### 8.6 Formulários

#### Usar React Hook Form + Zod
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

### 8.7 Animações

#### Usar Framer Motion para Landing Page
```typescript
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Conteúdo
</motion.div>
```

#### Evitar em Dashboards (Performance)
Use apenas Framer Motion em landing page. Para dashboards, usar Tailwind transitions.

### 8.8 Tipos TypeScript

#### Sempre Tipificar Props
```typescript
interface MyComponentProps {
  title: string;
  count?: number;
  onClick: (id: string) => void;
}
```

#### Usar Types/Interfaces Consistentemente
```typescript
// ✅ Recomendado
type Status = "ativo" | "pendente" | "concluido";
interface User { id: string; name: string; }

// ❌ Evitar
const statuses = ["ativo", "pendente"]; // Magic strings
```

### 8.9 Responsividade

#### Padrão Mobile-First
```typescript
// ✅ Recomendado
className="px-4 md:px-8 lg:px-12"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// ❌ Evitar
className="hidden md:block"  // Usar display quando necessário
```

#### Breakpoints Tailwind
| Prefixo | Width |
|---------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### 8.10 Cores e Temas

#### Usar Variáveis Sempre
```tsx
// ✅ Bom
className="bg-background border-border text-foreground"

// ✅ Aceitável (para cor primary)
className="bg-[#FFC107]"

// ❌ Evitar
className="bg-yellow-500 text-blue-200"
```

#### Paleta Padrão
| Elemento | Classe | Cor |
|----------|--------|-----|
| Background | `bg-background` | `#0F0F0F` |
| Card/Surface | `bg-[#1E1E1E]` | `#1E1E1E` |
| Border | `border-border` | `#2E2E2E` |
| Texto Principal | `text-foreground` | `#FFFFFF` |
| Texto Secundário | `text-muted-foreground` | `#A1A1AA` |
| Destaque | `text-[#FFC107]` | `#FFC107` (Amarelo) |

### 8.11 Tratamento de Erros

#### Página 404
```typescript
// src/pages/NotFound.tsx
const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen">
    <p>Página não encontrada</p>
  </div>
);
```

#### Validação de Formulários
```typescript
{errors.email && (
  <span className="text-sm text-destructive">{errors.email.message}</span>
)}
```

### 8.12 Acessibilidade (a11y)

#### Labels e ARIA
```tsx
// ✅ Recomendado
<label htmlFor="email">Email</label>
<input id="email" type="email" />

<button aria-label="Fechar menu">×</button>
```

#### Semântica HTML
```tsx
// ✅ Usar tags semânticas
<header>, <nav>, <main>, <footer>
<article>, <section>

// ❌ Evitar
<div className="header">
```

### 8.13 Testes (Vitest)

#### Estrutura de Teste
```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders title", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

### 8.14 Performance

#### Code Splitting (React Router)
```typescript
// ✅ Lazy load pages
const Dashboard = lazy(() => import("./pages/Dashboard"));

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Suspense>
```

#### Memoização
```typescript
// ✅ Para componentes pesados
const MyComponent = memo(({ data }) => (
  <div>{data}</div>
));
```

### 8.15 Documentação

#### JSDoc para Funções Públicas
```typescript
/**
 * Calcula o percentual de progresso do processo
 * @param currentPhase - Fase atual (1-4)
 * @returns Percentual de 0-100
 */
export const calculateProgress = (currentPhase: number): number => {
  return (currentPhase / 4) * 100;
};
```

---

## 9. Integração com Backend (Futuro)

### 9.1 Substituição de Mock Data

#### Atualmente (Mock)
```typescript
const MOCK_CLIENTES = [/* ... */];
const MOCK_PROCESSOS = [/* ... */];
```

#### Quando Integrar Backend
```typescript
// Usar React Query
const { data: clientes } = useQuery({
  queryKey: ["clientes"],
  queryFn: async () => {
    const res = await fetch("/api/clientes");
    return res.json();
  },
});
```

### 9.2 Endpoints Esperados

#### Advogado
- `GET /api/processos` — Listar processos
- `GET /api/processos/:id` — Detalhes
- `POST /api/processos` — Criar novo
- `PATCH /api/processos/:id/movimentacoes/:movId` — Editar tradução
- `GET /api/clientes` — Listar clientes
- `POST /api/clientes/:id/notificar` — Notificar cliente

#### Cliente
- `GET /api/cliente/casos` — Meus casos
- `GET /api/cliente/casos/:id` — Detalhes do caso

### 9.3 Autenticação

#### Implementar JWT
```typescript
// Interceptor de requisições
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 10. Checklist de Implementação de Novas Features

1. **Criar o arquivo de página:** `src/pages/NewFeature.tsx`
2. **Tipificar com TypeScript:** Interfaces/Types completas
3. **Adicionar rota:** `src/App.tsx` + router config
4. **Estilizar:** Tailwind + variáveis CSS
5. **Testar:** Vitest + casos de uso principais
6. **Documentar:** JSDoc + comentários explicativos
7. **Revisar:** Performance, a11y, responsividade
8. **Integrar:** React Query (quando houver backend)

---

## 11. Recursos e Referências

### Documentação Externa
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com)
- [React Query](https://tanstack.com/query/latest)

### Variáveis de Ambiente
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Jusclient
```

### Scripts Disponíveis
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "lint": "eslint src"
}
```

---

## 12. FAQ e Troubleshooting

### P: Como adicionar uma nova cor?
**R:** Adicionar em `tailwind.config.ts`:
```typescript
extend: {
  colors: {
    "my-color": "#ABC123",
  },
}
```

### P: Preciso fazer fetch de dados. Qual biblioteca usar?
**R:** Use `React Query` com `axios` ou `fetch`:
```typescript
import { useQuery } from "@tanstack/react-query";

const { data } = useQuery({
  queryKey: ["dados"],
  queryFn: () => fetch("/api/dados").then(r => r.json()),
});
```

### P: Como adicionar uma nova página?
**R:** 
1. Criar `src/pages/MyPage.tsx`
2. Importar layout (`DashboardLayout` ou `ClientLayout`)
3. Adicionar rota em `src/App.tsx`
4. Navegar via `<Link to="/my-page">`

### P: Qual é a convenção para nomes de arquivos?
**R:** 
- Páginas: `PascalCase.tsx` (ex: `src/pages/Dashboard.tsx`)
- Componentes: `PascalCase.tsx` (ex: `src/components/landing/HeroSection.tsx`)
- Hooks: `kebab-case.ts/tsx` (ex: `use-mobile.tsx`)
- Utils: `camelCase.ts` (ex: `utils.ts`)

---

**Versão:** 1.0  
**Última atualização:** 22 de fevereiro de 2026  
**Maintainer:** Equipe Jusclient
