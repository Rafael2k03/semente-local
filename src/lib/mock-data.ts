export interface Transaction {
  id: string;
  type: "in" | "out" | "convert_in" | "convert_out";
  amount: number;
  description: string;
  date: string;
  counterpart?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: "resident" | "merchant" | "admin";
  balance: number;
  avatar?: string;
}

export const currentUser: User = {
  id: "1",
  name: "Maria Silva",
  phone: "(11) 98765-4321",
  role: "resident",
  balance: 450.0,
};

export const transactions: Transaction[] = [
  { id: "1", type: "in", amount: 50, description: "Recebido de João", date: "2026-04-05T10:30:00", counterpart: "João Santos" },
  { id: "2", type: "out", amount: 25, description: "Pagamento - Padaria Sol", date: "2026-04-04T14:15:00", counterpart: "Padaria Sol" },
  { id: "3", type: "convert_in", amount: 200, description: "Conversão BRL → Semente", date: "2026-04-03T09:00:00" },
  { id: "4", type: "out", amount: 80, description: "Pagamento - Mercado Local", date: "2026-04-02T16:45:00", counterpart: "Mercado Local" },
  { id: "5", type: "in", amount: 30, description: "Recebido de Ana", date: "2026-04-01T11:20:00", counterpart: "Ana Oliveira" },
  { id: "6", type: "convert_out", amount: 100, description: "Conversão Semente → BRL", date: "2026-03-30T08:00:00" },
  { id: "7", type: "out", amount: 15, description: "Pagamento - Feira Livre", date: "2026-03-29T10:00:00", counterpart: "Feira Livre" },
  { id: "8", type: "in", amount: 120, description: "Recebido de Carlos", date: "2026-03-28T17:30:00", counterpart: "Carlos Mendes" },
];

export const adminStats = {
  totalUsers: 187,
  activeUsers: 142,
  totalCirculation: 18750,
  totalReserve: 18750,
  totalTransactions: 1243,
  dailyVolume: 2340,
  monthlyGrowth: 12.5,
  conversionFeeCollected: 375,
};

export const merchants = [
  { id: "1", name: "Padaria Sol", category: "Alimentação", active: true },
  { id: "2", name: "Mercado Local", category: "Mercado", active: true },
  { id: "3", name: "Barbearia do Zé", category: "Serviços", active: true },
  { id: "4", name: "Feira Livre Comunitária", category: "Alimentação", active: true },
  { id: "5", name: "Costura da Dona Maria", category: "Serviços", active: false },
];
