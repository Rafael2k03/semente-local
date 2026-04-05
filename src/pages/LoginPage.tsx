import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sprout } from "lucide-react";
import sementeLogo from "@/assets/semente-logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState("");

  const handleSendOtp = () => {
    if (phone.length >= 10) setStep("otp");
  };

  const handleVerify = () => {
    if (otp.length >= 4) navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center">
          <img src={sementeLogo} alt="Semente" width={80} height={80} className="mb-2" />
          <div className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Semente</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Moeda social da comunidade</p>
        </div>

        <div className="mt-10 space-y-4">
          {step === "phone" ? (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Seu telefone
                </label>
                <Input
                  type="tel"
                  placeholder="(11) 98765-4321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 rounded-xl text-base"
                />
              </div>
              <Button onClick={handleSendOtp} className="h-12 w-full rounded-xl text-base font-semibold">
                Entrar com SMS
              </Button>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <span className="relative bg-background px-3 text-xs text-muted-foreground">ou</span>
              </div>
              <Button
                variant="outline"
                onClick={() => setStep("otp")}
                className="h-12 w-full rounded-xl text-base"
              >
                Entrar com e-mail
              </Button>
            </>
          ) : (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Código de verificação
                </label>
                <Input
                  type="text"
                  placeholder="0000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-12 rounded-xl text-center text-2xl tracking-[0.5em]"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Enviamos um código para {phone || "seu telefone"}
                </p>
              </div>
              <Button onClick={handleVerify} className="h-12 w-full rounded-xl text-base font-semibold">
                Verificar
              </Button>
              <button
                onClick={() => setStep("phone")}
                className="w-full text-center text-sm text-primary"
              >
                Voltar
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
