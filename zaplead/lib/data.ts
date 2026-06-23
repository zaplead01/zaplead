export type Status =
  | "novo"
  | "contato"
  | "negociacao"
  | "proposta"
  | "fechado"
  | "perdido"

export type Origem =
  | "WhatsApp"
  | "Instagram"
  | "Indicação"
  | "Anúncio"
  | "Site"
  | "Facebook"

export interface Interacao {
  id: string
  tipo: "mensagem" | "ligacao" | "reuniao" | "proposta" | "nota"
  descricao: string
  data: string
}

export interface Tarefa {
  id: string
  titulo: string
  cliente: string
  vencimento: string
  concluida: boolean
  prioridade: "alta" | "media" | "baixa"
}

export interface Cliente {
  id: string
  nome: string
  telefone: string
  cidade: string
  origem: Origem
  status: Status
  observacao: string
  valor: number
  criadoEm: string
  ultimaInteracao: string
  interacoes: Interacao[]
}

export const statusLabels: Record<Status, string> = {
  novo: "Novo",
  contato: "Contato",
  negociacao: "Negociação",
  proposta: "Proposta",
  fechado: "Fechado",
  perdido: "Perdido",
}

export const statusOrder: Status[] = [
  "novo",
  "contato",
  "negociacao",
  "proposta",
  "fechado",
  "perdido",
]

export const origens: Origem[] = [
  "WhatsApp",
  "Instagram",
  "Indicação",
  "Anúncio",
  "Site",
  "Facebook",
]

export const clientes: Cliente[] = [
  {
    id: "1",
    nome: "Mariana Alves",
    telefone: "(11) 98765-4321",
    cidade: "São Paulo, SP",
    origem: "WhatsApp",
    status: "negociacao",
    observacao: "Interessada no plano anual. Pediu desconto para fechar.",
    valor: 2400,
    criadoEm: "2026-06-23",
    ultimaInteracao: "Há 2 horas",
    interacoes: [
      { id: "i1", tipo: "mensagem", descricao: "Primeiro contato via WhatsApp", data: "23/06 09:12" },
      { id: "i2", tipo: "ligacao", descricao: "Ligação de apresentação realizada", data: "23/06 11:40" },
      { id: "i3", tipo: "proposta", descricao: "Proposta do plano anual enviada", data: "23/06 14:05" },
    ],
  },
  {
    id: "2",
    nome: "Carlos Eduardo",
    telefone: "(21) 99888-1122",
    cidade: "Rio de Janeiro, RJ",
    origem: "Instagram",
    status: "novo",
    observacao: "Veio do anúncio do Instagram, pediu informações.",
    valor: 0,
    criadoEm: "2026-06-23",
    ultimaInteracao: "Há 30 minutos",
    interacoes: [
      { id: "i1", tipo: "mensagem", descricao: "Pediu informações pelo direct", data: "23/06 15:30" },
    ],
  },
  {
    id: "3",
    nome: "Fernanda Souza",
    telefone: "(31) 98123-4567",
    cidade: "Belo Horizonte, MG",
    origem: "Indicação",
    status: "fechado",
    observacao: "Cliente fechou o plano premium. Excelente relacionamento.",
    valor: 4800,
    criadoEm: "2026-06-18",
    ultimaInteracao: "Há 1 dia",
    interacoes: [
      { id: "i1", tipo: "mensagem", descricao: "Indicada pela Mariana", data: "18/06 10:00" },
      { id: "i2", tipo: "reuniao", descricao: "Reunião de fechamento", data: "20/06 16:00" },
      { id: "i3", tipo: "nota", descricao: "Contrato assinado", data: "21/06 09:00" },
    ],
  },
  {
    id: "4",
    nome: "Roberto Lima",
    telefone: "(41) 99777-3344",
    cidade: "Curitiba, PR",
    origem: "Anúncio",
    status: "proposta",
    observacao: "Avaliando proposta. Retorno previsto para amanhã.",
    valor: 1800,
    criadoEm: "2026-06-21",
    ultimaInteracao: "Há 5 horas",
    interacoes: [
      { id: "i1", tipo: "mensagem", descricao: "Contato via anúncio", data: "21/06 08:20" },
      { id: "i2", tipo: "proposta", descricao: "Proposta enviada", data: "23/06 10:15" },
    ],
  },
  {
    id: "5",
    nome: "Juliana Castro",
    telefone: "(51) 98555-6677",
    cidade: "Porto Alegre, RS",
    origem: "Site",
    status: "contato",
    observacao: "Preencheu formulário do site. Aguardando melhor horário.",
    valor: 0,
    criadoEm: "2026-06-22",
    ultimaInteracao: "Há 8 horas",
    interacoes: [
      { id: "i1", tipo: "mensagem", descricao: "Formulário do site preenchido", data: "22/06 19:00" },
      { id: "i2", tipo: "ligacao", descricao: "Tentativa de ligação", data: "23/06 09:00" },
    ],
  },
  {
    id: "6",
    nome: "Pedro Henrique",
    telefone: "(61) 99444-8899",
    cidade: "Brasília, DF",
    origem: "WhatsApp",
    status: "perdido",
    observacao: "Optou por concorrente. Manter para futuras campanhas.",
    valor: 0,
    criadoEm: "2026-06-15",
    ultimaInteracao: "Há 3 dias",
    interacoes: [
      { id: "i1", tipo: "mensagem", descricao: "Primeiro contato", data: "15/06 14:00" },
      { id: "i2", tipo: "nota", descricao: "Cliente escolheu concorrente", data: "19/06 11:00" },
    ],
  },
  {
    id: "7",
    nome: "Amanda Ribeiro",
    telefone: "(85) 98222-3311",
    cidade: "Fortaleza, CE",
    origem: "Instagram",
    status: "negociacao",
    observacao: "Negociando condições de pagamento parcelado.",
    valor: 3200,
    criadoEm: "2026-06-20",
    ultimaInteracao: "Há 4 horas",
    interacoes: [
      { id: "i1", tipo: "mensagem", descricao: "Contato pelo Instagram", data: "20/06 13:00" },
      { id: "i2", tipo: "reuniao", descricao: "Reunião online realizada", data: "22/06 15:30" },
    ],
  },
  {
    id: "8",
    nome: "Lucas Martins",
    telefone: "(48) 99111-2200",
    cidade: "Florianópolis, SC",
    origem: "Indicação",
    status: "novo",
    observacao: "Indicado por cliente atual. Alto potencial.",
    valor: 0,
    criadoEm: "2026-06-23",
    ultimaInteracao: "Há 1 hora",
    interacoes: [
      { id: "i1", tipo: "mensagem", descricao: "Indicação recebida", data: "23/06 14:00" },
    ],
  },
  {
    id: "9",
    nome: "Beatriz Gomes",
    telefone: "(62) 98333-4455",
    cidade: "Goiânia, GO",
    origem: "Facebook",
    status: "fechado",
    observacao: "Fechou pacote trimestral. Pagamento confirmado.",
    valor: 2700,
    criadoEm: "2026-06-12",
    ultimaInteracao: "Há 2 dias",
    interacoes: [
      { id: "i1", tipo: "mensagem", descricao: "Veio do Facebook Ads", data: "12/06 10:00" },
      { id: "i2", tipo: "nota", descricao: "Venda confirmada", data: "16/06 12:00" },
    ],
  },
  {
    id: "10",
    nome: "Thiago Nunes",
    telefone: "(71) 99666-7788",
    cidade: "Salvador, BA",
    origem: "Anúncio",
    status: "contato",
    observacao: "Demonstrou interesse, pediu para retornar na próxima semana.",
    valor: 0,
    criadoEm: "2026-06-22",
    ultimaInteracao: "Há 6 horas",
    interacoes: [
      { id: "i1", tipo: "mensagem", descricao: "Resposta ao anúncio", data: "22/06 16:00" },
    ],
  },
  {
    id: "11",
    nome: "Camila Ferreira",
    telefone: "(11) 98000-1234",
    cidade: "Campinas, SP",
    origem: "WhatsApp",
    status: "proposta",
    observacao: "Proposta enviada, aguardando aprovação do sócio.",
    valor: 5600,
    criadoEm: "2026-06-19",
    ultimaInteracao: "Há 12 horas",
    interacoes: [
      { id: "i1", tipo: "mensagem", descricao: "Contato pelo WhatsApp", data: "19/06 11:00" },
      { id: "i2", tipo: "proposta", descricao: "Proposta comercial enviada", data: "22/06 18:00" },
    ],
  },
  {
    id: "12",
    nome: "Rafael Oliveira",
    telefone: "(27) 99555-9988",
    cidade: "Vitória, ES",
    origem: "Site",
    status: "negociacao",
    observacao: "Em negociação avançada, definindo escopo final.",
    valor: 4100,
    criadoEm: "2026-06-21",
    ultimaInteracao: "Há 3 horas",
    interacoes: [
      { id: "i1", tipo: "mensagem", descricao: "Lead do site", data: "21/06 09:30" },
      { id: "i2", tipo: "ligacao", descricao: "Alinhamento de escopo", data: "23/06 13:00" },
    ],
  },
]

export const tarefas: Tarefa[] = [
  { id: "t1", titulo: "Enviar proposta para Mariana Alves", cliente: "Mariana Alves", vencimento: "2026-06-23", concluida: false, prioridade: "alta" },
  { id: "t2", titulo: "Ligar para Carlos Eduardo", cliente: "Carlos Eduardo", vencimento: "2026-06-23", concluida: false, prioridade: "media" },
  { id: "t3", titulo: "Reunião de fechamento com Amanda", cliente: "Amanda Ribeiro", vencimento: "2026-06-24", concluida: false, prioridade: "alta" },
  { id: "t4", titulo: "Enviar contrato para Fernanda Souza", cliente: "Fernanda Souza", vencimento: "2026-06-22", concluida: true, prioridade: "alta" },
  { id: "t5", titulo: "Follow-up Roberto Lima", cliente: "Roberto Lima", vencimento: "2026-06-25", concluida: false, prioridade: "media" },
  { id: "t6", titulo: "Confirmar pagamento Beatriz", cliente: "Beatriz Gomes", vencimento: "2026-06-21", concluida: true, prioridade: "baixa" },
  { id: "t7", titulo: "Apresentar planos para Thiago", cliente: "Thiago Nunes", vencimento: "2026-06-26", concluida: false, prioridade: "baixa" },
  { id: "t8", titulo: "Retomar contato com Pedro Henrique", cliente: "Pedro Henrique", vencimento: "2026-06-27", concluida: false, prioridade: "media" },
]

export const desempenhoMensal = [
  { mes: "Jan", leads: 42, vendas: 12 },
  { mes: "Fev", leads: 55, vendas: 18 },
  { mes: "Mar", leads: 48, vendas: 15 },
  { mes: "Abr", leads: 67, vendas: 22 },
  { mes: "Mai", leads: 73, vendas: 28 },
  { mes: "Jun", leads: 89, vendas: 34 },
]

export const origemDistribuicao = [
  { origem: "WhatsApp", total: 38 },
  { origem: "Instagram", total: 24 },
  { origem: "Indicação", total: 18 },
  { origem: "Anúncio", total: 15 },
  { origem: "Site", total: 12 },
  { origem: "Facebook", total: 8 },
]

export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  })
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}
