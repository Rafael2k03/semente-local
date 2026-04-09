import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sprout, Eye, EyeOff, Phone, Mail } from "lucide-react";
import sementeLogo from "@/assets/semente-logo.png";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type Step = "choose" | "email-input";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [step, setStep] = useState<Step>("choose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast({ title: "Campos obrigatórios", description: "Preencha e-mail e senha.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Erro ao entrar", description: "E-mail ou senha incorretos. Tente novamente.", variant: "destructive" });
    } else {
      navigate("/");
    }
  };

  const renderChoose = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <Button
        onClick={() => setStep("email-input")}
        className="h-14 w-full rounded-xl text-base font-semibold gap-3"
      >
        <Mail className="h-5 w-5" />
        Entrar com e-mail
      </Button>
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
            onKeyDown={(e) => e.key === "Enter" && handleEmailLogin()}
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
        {step === "email-input" && renderEmailInput()}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Não tem conta?{" "}
          <Link to="/cadastro" className="font-semibold text-primary">Criar conta</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
