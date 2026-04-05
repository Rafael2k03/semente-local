import { Eye, EyeOff, Sprout } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface BalanceCardProps {
  balance: number;
  name: string;
}

const BalanceCard = ({ balance, name }: BalanceCardProps) => {
  const [visible, setVisible] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="gradient-hero rounded-2xl p-6 text-primary-foreground shadow-elevated"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sprout className="h-5 w-5" />
          <span className="text-sm font-medium opacity-90">Olá, {name.split(" ")[0]}</span>
        </div>
        <button onClick={() => setVisible(!visible)} className="rounded-full p-1.5 hover:bg-primary-foreground/10">
          {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wider opacity-70">Saldo disponível</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-sm font-medium opacity-70">S$</span>
          <span className="text-3xl font-bold tracking-tight">
            {visible ? balance.toFixed(2).replace(".", ",") : "••••"}
          </span>
        </div>
        <p className="mt-1 text-xs opacity-60">
          ≈ R$ {visible ? balance.toFixed(2).replace(".", ",") : "••••"}
        </p>
      </div>
    </motion.div>
  );
};

export default BalanceCard;
