import { ArrowDownLeft, ArrowUpRight, RefreshCw } from "lucide-react";
import type { Transaction } from "@/lib/mock-data";

const iconMap = {
  in: { icon: ArrowDownLeft, color: "bg-primary/10 text-primary" },
  out: { icon: ArrowUpRight, color: "bg-destructive/10 text-destructive" },
  convert_in: { icon: RefreshCw, color: "bg-secondary/10 text-secondary" },
  convert_out: { icon: RefreshCw, color: "bg-secondary/10 text-secondary" },
};

const TransactionItem = ({ tx }: { tx: Transaction }) => {
  const { icon: Icon, color } = iconMap[tx.type];
  const isPositive = tx.type === "in" || tx.type === "convert_in";
  const dateStr = new Date(tx.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });

  return (
    <div className="flex items-center gap-3 py-3">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{tx.description}</p>
        <p className="text-xs text-muted-foreground">{dateStr}</p>
      </div>
      <span className={`text-sm font-semibold ${isPositive ? "text-primary" : "text-destructive"}`}>
        {isPositive ? "+" : "-"} S$ {tx.amount.toFixed(2).replace(".", ",")}
      </span>
    </div>
  );
};

export default TransactionItem;
