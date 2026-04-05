import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const contacts = [
  { id: "1", name: "João Santos", phone: "(11) 91234-5678" },
  { id: "2", name: "Ana Oliveira", phone: "(11) 94321-8765" },
  { id: "3", name: "Carlos Mendes", phone: "(11) 97654-3210" },
  { id: "4", name: "Padaria Sol", phone: "(11) 93456-7890" },
];

const TransferPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"select" | "amount" | "confirm">("select");
  const [selected, setSelected] = useState<(typeof contacts)[0] | null>(null);
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    toast.success(`S$ ${amount} enviado para ${selected?.name}!`);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-hero px-4 pb-6 pt-4 text-primary-foreground">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <button onClick={() => (step === "select" ? navigate(-1) : setStep("select"))} className="rounded-full p-2 hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">Enviar Sementes</h1>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-6">
        {step === "select" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar contato..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 rounded-xl pl-10 text-base"
              />
            </div>
            <div className="divide-y divide-border rounded-2xl bg-card shadow-card">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setSelected(c); setStep("amount"); }}
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {c.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.phone}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "amount" && selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                {selected.name[0]}
              </div>
              <p className="mt-2 font-medium text-foreground">{selected.name}</p>
            </div>
            <div className="text-center">
              <label className="text-sm text-muted-foreground">Quanto deseja enviar?</label>
              <div className="mt-2 flex items-center justify-center gap-1">
                <span className="text-2xl font-medium text-muted-foreground">S$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                  className="w-40 border-none bg-transparent text-center text-4xl font-bold text-foreground outline-none"
                />
              </div>
            </div>
            <Button
              onClick={() => setStep("confirm")}
              disabled={!amount || parseFloat(amount) <= 0}
              className="h-12 w-full rounded-xl text-base font-semibold"
            >
              Continuar
            </Button>
          </motion.div>
        )}

        {step === "confirm" && selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="rounded-2xl bg-card p-6 shadow-card">
              <h3 className="text-center text-sm font-medium text-muted-foreground">Confirmar envio</h3>
              <p className="mt-3 text-center text-3xl font-bold text-foreground">
                S$ {parseFloat(amount).toFixed(2).replace(".", ",")}
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Para</span>
                  <span className="font-medium text-foreground">{selected.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Telefone</span>
                  <span className="font-medium text-foreground">{selected.phone}</span>
                </div>
              </div>
            </div>
            <Button onClick={handleConfirm} className="h-12 w-full rounded-xl text-base font-semibold">
              <Send className="mr-2 h-4 w-4" /> Confirmar envio
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TransferPage;
