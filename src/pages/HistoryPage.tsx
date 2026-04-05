import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Filter } from "lucide-react";
import TransactionItem from "@/components/TransactionItem";
import { transactions } from "@/lib/mock-data";
import { useState } from "react";

const filters = ["Todas", "Entradas", "Saídas", "Conversões"];

const HistoryPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Todas");

  const filtered = transactions.filter((tx) => {
    if (active === "Entradas") return tx.type === "in";
    if (active === "Saídas") return tx.type === "out";
    if (active === "Conversões") return tx.type === "convert_in" || tx.type === "convert_out";
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-hero px-4 pb-6 pt-4 text-primary-foreground">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <button onClick={() => navigate(-1)} className="rounded-full p-2 hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">Extrato</h1>
          <div className="flex-1" />
          <button className="rounded-full p-2 hover:bg-primary-foreground/10">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                active === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 divide-y divide-border rounded-2xl bg-card p-4 shadow-card"
        >
          {filtered.map((tx) => (
            <TransactionItem key={tx.id} tx={tx} />
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Nenhuma movimentação encontrada
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HistoryPage;
