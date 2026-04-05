import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  TrendingUp,
  Wallet,
  ShieldCheck,
  ArrowUpDown,
  DollarSign,
  BarChart3,
  FileText,
} from "lucide-react";
import { adminStats, merchants } from "@/lib/mock-data";

const statCards = [
  { label: "Usuários ativos", value: adminStats.activeUsers.toString(), total: `/ ${adminStats.totalUsers} total`, icon: Users, color: "bg-primary/10 text-primary" },
  { label: "Sementes em circulação", value: `S$ ${adminStats.totalCirculation.toLocaleString("pt-BR")}`, icon: Wallet, color: "bg-accent text-accent-foreground" },
  { label: "Fundo de lastro (R$)", value: `R$ ${adminStats.totalReserve.toLocaleString("pt-BR")}`, icon: ShieldCheck, color: "bg-success/10 text-success" },
  { label: "Volume diário", value: `S$ ${adminStats.dailyVolume.toLocaleString("pt-BR")}`, icon: ArrowUpDown, color: "bg-info/10 text-info" },
  { label: "Taxas arrecadadas", value: `R$ ${adminStats.conversionFeeCollected.toLocaleString("pt-BR")}`, icon: DollarSign, color: "bg-warning/10 text-warning" },
  { label: "Crescimento mensal", value: `+${adminStats.monthlyGrowth}%`, icon: TrendingUp, color: "bg-primary/10 text-primary" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="gradient-hero px-4 pb-6 pt-4 text-primary-foreground">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <button onClick={() => navigate("/")} className="rounded-full p-2 hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Painel Administrativo</h1>
            <p className="text-xs opacity-70">Banco Comunitário Semente</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pt-6">
        {/* Reserve Fund Alert */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-3 rounded-2xl bg-accent p-4"
        >
          <ShieldCheck className="h-8 w-8 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-semibold text-accent-foreground">Lastro 100% garantido</p>
            <p className="text-xs text-muted-foreground">
              Todo Semente emitido possui lastro em Real. Reserva: R$ {adminStats.totalReserve.toLocaleString("pt-BR")}
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-2xl bg-card p-4 shadow-card"
            >
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">
                {stat.label}
                {stat.total && <span className="ml-1 opacity-60">{stat.total}</span>}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Merchants */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Comerciantes parceiros</h2>
            <span className="text-xs text-muted-foreground">{merchants.length} cadastrados</span>
          </div>
          <div className="mt-3 divide-y divide-border rounded-2xl bg-card shadow-card">
            {merchants.map((m) => (
              <div key={m.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {m.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.category}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${m.active ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                  {m.active ? "Ativo" : "Inativo"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick admin actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid grid-cols-2 gap-3"
        >
          <button className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card transition-colors hover:bg-muted/50">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Relatórios</span>
          </button>
          <button className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card transition-colors hover:bg-muted/50">
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Exportar PDF</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
