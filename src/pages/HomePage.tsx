import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BalanceCard from "@/components/BalanceCard";
import QuickActions from "@/components/QuickActions";
import TransactionItem from "@/components/TransactionItem";
import { currentUser, transactions } from "@/lib/mock-data";

const HomePage = () => {
  const navigate = useNavigate();
  const recent = transactions.slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 pt-6">
        <BalanceCard balance={currentUser.balance} name={currentUser.name} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <QuickActions />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Últimas movimentações</h2>
            <button
              onClick={() => navigate("/extrato")}
              className="text-xs font-medium text-primary"
            >
              Ver tudo
            </button>
          </div>

          <div className="mt-3 divide-y divide-border rounded-2xl bg-card p-4 shadow-card">
            {recent.map((tx) => (
              <TransactionItem key={tx.id} tx={tx} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
