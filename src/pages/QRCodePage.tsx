import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, QrCode, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QRCodePage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"receive" | "scan">("receive");
  const [amount, setAmount] = useState("");

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-hero px-4 pb-6 pt-4 text-primary-foreground">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <button onClick={() => navigate(-1)} className="rounded-full p-2 hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">QR Code</h1>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-6">
        <div className="flex rounded-xl bg-muted p-1">
          <button
            onClick={() => setTab("receive")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${tab === "receive" ? "bg-card text-foreground shadow-card" : "text-muted-foreground"}`}
          >
            Receber
          </button>
          <button
            onClick={() => setTab("scan")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${tab === "scan" ? "bg-card text-foreground shadow-card" : "text-muted-foreground"}`}
          >
            Escanear
          </button>
        </div>

        {tab === "receive" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
            <div className="flex flex-col items-center rounded-2xl bg-card p-8 shadow-card">
              <div className="flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted">
                <QrCode className="h-32 w-32 text-primary/30" />
              </div>
              <p className="mt-4 text-sm font-medium text-foreground">Maria Silva</p>
              <p className="text-xs text-muted-foreground">Mostre este código para receber</p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Valor (opcional)
              </label>
              <Input
                type="number"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 rounded-xl text-base"
              />
            </div>
            <Button className="h-12 w-full rounded-xl text-base font-semibold">
              Gerar QR Code com valor
            </Button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
            <div className="flex flex-col items-center rounded-2xl bg-card p-12 shadow-card">
              <div className="flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-muted">
                <Camera className="h-16 w-16 text-muted-foreground" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Aponte a câmera para o QR Code
              </p>
              <Button className="mt-6 h-12 w-full rounded-xl text-base font-semibold">
                Abrir câmera
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QRCodePage;
