import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";

const ReceivePage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText("semente://pay/maria-silva/" + (amount || "0"));
    toast.success("Link copiado!");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-hero px-4 pb-6 pt-4 text-primary-foreground">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <button onClick={() => navigate(-1)} className="rounded-full p-2 hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">Receber Sementes</h1>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Valor a receber (opcional)
            </label>
            <Input
              type="number"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 rounded-xl text-base"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleCopy} variant="outline" className="h-12 flex-1 rounded-xl text-base">
              <Copy className="mr-2 h-4 w-4" /> Copiar link
            </Button>
            <Button className="h-12 flex-1 rounded-xl text-base font-semibold">
              <Share2 className="mr-2 h-4 w-4" /> Compartilhar
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReceivePage;
