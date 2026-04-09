import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sprout, Eye, EyeOff, Phone, Mail } from "lucide-react";
import sementeLogo from "@/assets/semente-logo.png";
import { useToast } from "@/hooks/use-toast";

type AuthMethod = "phone" | "email";
type Step = "choose" | "phone-input" | "email-input" | "otp";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [method, setMethod] = useState<AuthMethod>("phone");
  const [step, setStep] = useState<Step>("choose");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleSendOtp = () => {
    if (phone.replace(/\D/g, "").length < 10) {
      toast({ title: "Número inválido", description: "Digite um número de telefone válido.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      toast({ title: "Código enviado!", description: `Enviamos um código para ${phone}` });
    }, 1200);
  };

  const handleEmailLogin = () => {
    if (!email || !password) {
      toast({ title: "Campos obrigatórios", description: "Preencha e-mail e senha.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) {
      toast({ title: "Código inválido", description: "Digite o código completo.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  const renderChoose = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <Button
        onClick={() => { setMethod("phone"); setStep("phone-input"); }}
        className="h-14 w-full rounded-xl text-base font-semibold gap-3"
      >
        <Phone className="h-5 w-5" />
        Entrar com telefone
      </Button>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
        <span className="relative bg-background px-3 text-xs text-muted-foreground">ou</span>
      </div>
      <Button
        variant="outline"
        onClick={() => { setMethod("email"); setStep("email-input"); }}
        className="h-14 w-full rounded-xl text-base gap-3"
      >
        <Mail className="h-5 w-5" />
        Entrar com e-mail
      </Button>
    </motion.div>
  );

  const renderPhoneInput = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Seu telefone</label>
        <Input
          type="tel"
          placeholder="(11) 98765-4321"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          className="h-12 rounded-xl text-base"
        />
      </div>
      <Button onClick={handleSendOtp} disabled={loading} className="h-12 w-full rounded-xl text-base font-semibold">
        {loading ? "Enviando..." : "Receber código"}
      </Button>
      <button onClick={() => setStep("choose")} className="w-full text-center text-sm text-primary">Voltar</button>
    </motion.div>
  );

  const renderEmailInput = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Digite seu e-mail</label>
        <Input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-xl text-base"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Digite sua senha</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-xl text-base pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <Button onClick={handleEmailLogin} disabled={loading} className="h-12 w-full rounded-xl text-base font-semibold">
        {loading ? "Entrando..." : "Entrar"}
      </Button>
      <Link to="/esqueci-senha" className="block w-full text-center text-sm text-primary">
        Esqueci minha senha
      </Link>
      <button onClick={() => setStep("choose")} className="w-full text-center text-sm text-muted-foreground">Voltar</button>
    </motion.div>
  );

  const renderOtp = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Código de verificação</label>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="000000"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="h-14 rounded-xl text-center text-2xl tracking-[0.5em]"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Enviamos um código para {phone}
        </p>
      </div>
      <Button onClick={handleVerifyOtp} disabled={loading} className="h-12 w-full rounded-xl text-base font-semibold">
        {loading ? "Verificando..." : "Verificar"}
      </Button>
      <button onClick={handleSendOtp} className="w-full text-center text-sm text-primary">
        Reenviar código
      </button>
      <button onClick={() => setStep("phone-input")} className="w-full text-center text-sm text-muted-foreground">
        Voltar
      </button>
    </motion.div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={sementeLogo} alt="Semente" width={72} height={72} className="mb-2" />
          <div className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Semente</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Moeda social da comunidade</p>
        </div>

        {step === "choose" && renderChoose()}
        {step === "phone-input" && renderPhoneInput()}
        {step === "email-input" && renderEmailInput()}
        {step === "otp" && renderOtp()}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Não tem conta?{" "}
          <Link to="/cadastro" className="font-semibold text-primary">Criar conta</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
