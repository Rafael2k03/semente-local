import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ConvertPage = () => {
  const navigate = useNavigate();
  const [direction, setDirection] = useState<"brl_to_semente" | "semente_to_brl">("brl_to_semente");
  const [amount, setAmount] = useState("");
  const fee = 0.02;
  const numAmount = parseFloat(amount) || 0;
  const feeAmount = numAmount * fee;
  const received = numAmount - feeAmount;

  const handleConvert = () => {
    toast.success(
      direction === "brl_to_semente"
        ? `Convertido R$ ${numAmount.toFixed(2)} em S$ ${received.toFixed(2)}`
        : `Convertido S$ ${numAmount.toFixed(2)} em R$ ${received.toFixed(2)}`
    );
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-hero px-4 pb-6 pt-4 text-primary-foreground">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <button onClick={() => navigate(-1)} className="rounded-full p-2 hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">Converter</h1>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="rounded-2xl bg-card p-5 shadow-card">
            <label className="text-xs font-medium text-muted-foreground">
              {direction === "brl_to_semente" ? "Você envia (R$)" : "Você envia (S$)"}
            </label>
            <Input
              type="number"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2 h-14 border-none bg-muted text-center text-2xl font-bold"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setDirection(direction === "brl_to_semente" ? "semente_to_brl" : "brl_to_semente")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-transform hover:scale-105"
            >
              <ArrowDown className="h-5 w-5" />
            </button>
          </div>

          <div className="rounded-2xl bg-card p-5 shadow-card">
            <label className="text-xs font-medium text-muted-foreground">
              {direction === "brl_to_semente" ? "Você recebe (S$)" : "Você recebe (R$)"}
            </label>
            <p className="mt-2 text-center text-2xl font-bold text-foreground">
              {received > 0 ? received.toFixed(2).replace(".", ",") : "0,00"}
            </p>
          </div>

          {numAmount > 0 && (
            <div className="rounded-xl bg-muted p-3">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Taxa de conversão (2%)</span>
                <span className="font-medium text-foreground">
                  {direction === "brl_to_semente" ? "R$" : "S$"} {feeAmount.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          )}

          <Button
            onClick={handleConvert}
            disabled={numAmount <= 0}
            className="h-12 w-full rounded-xl text-base font-semibold"
          >
            Converter agora
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ConvertPage;
