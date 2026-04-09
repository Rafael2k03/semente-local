import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BalanceCard from "@/components/BalanceCard";
import QuickActions from "@/components/QuickActions";
import TransactionItem from "@/components/TransactionItem";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: wallet } = useQuery({
    queryKey: ["wallet", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wallets")
        .select("balance")
        .eq("user_id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: transactions } = useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .or(`sender_id.eq.${user!.id},receiver_id.eq.${user!.id}`)
        .order("created_at", { ascending: false })
        .limit(4);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const mapTxType = (tx: NonNullable<typeof transactions>[0]) => {
    if (tx.type === "conversion_in") return "convert_in" as const;
    if (tx.type === "conversion_out") return "convert_out" as const;
    return tx.sender_id === user?.id ? ("out" as const) : ("in" as const);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 pt-6">
        <BalanceCard
          balance={wallet?.balance ?? 0}
          name={profile?.full_name || user?.email || "Usuário"}
        />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6">
          <QuickActions />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Últimas movimentações</h2>
            <button onClick={() => navigate("/extrato")} className="text-xs font-medium text-primary">
              Ver tudo
            </button>
          </div>

          <div className="mt-3 divide-y divide-border rounded-2xl bg-card p-4 shadow-card">
            {transactions && transactions.length > 0 ? (
              transactions.map((tx) => (
                <TransactionItem
                  key={tx.id}
                  tx={{
                    id: tx.id,
                    type: mapTxType(tx),
                    amount: tx.amount,
                    description: tx.description || "Transação",
                    date: tx.created_at,
                  }}
                />
              ))
            ) : (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Nenhuma movimentação ainda
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
