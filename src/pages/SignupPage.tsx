import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sprout, Eye, EyeOff, ChevronLeft, Check } from "lucide-react";
import sementeLogo from "@/assets/semente-logo.png";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type Step = "info" | "role" | "credentials" | "done";
type UserRole = "morador" | "comerciante";

const SignupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp } = useAuth();
  const [step, setStep] = useState<Step>("info");
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const passwordStrength = () => {
    if (password.length < 6) return { label: "Fraca", color: "bg-destructive", width: "w-1/4" };
    if (password.length < 8) return { label: "Média", color: "bg-yellow-500", width: "w-2/4" };
    if (/[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8)
      return { label: "Forte", color: "bg-primary", width: "w-full" };
    return { label: "Boa", color: "bg-blue-500", width: "w-3/4" };
  };

  const handleInfoNext = () => {
    if (!nome.trim()) { toast({ title: "Nome obrigatório", description: "Digite seu nome completo.", variant: "destructive" }); return; }
    if (cpf.replace(/\D/g, "").length < 11) { toast({ title: "CPF inválido", description: "Digite um CPF válido.", variant: "destructive" }); return; }
    if (telefone.replace(/\D/g, "").length < 10) { toast({ title: "Telefone inválido", description: "Digite um número válido.", variant: "destructive" }); return; }
    setStep("role");
  };

  const handleRoleNext = () => {
    if (!role) { toast({ title: "Selecione um tipo", description: "Escolha seu tipo de conta.", variant: "destructive" }); return; }
    setStep("credentials");
  };

  const handleCreateAccount = async () => {
    if (!email) { toast({ title: "E-mail obrigatório", variant: "destructive" }); return; }
    if (password.length < 6) { toast({ title: "Senha muito curta", description: "A senha deve ter no mínimo 6 caracteres.", variant: "destructive" }); return; }

    setLoading(true);
    const { error } = await signUp(email, password, {
      full_name: nome,
      cpf: cpf.replace(/\D/g, ""),
      phone: telefone.replace(/\D/g, ""),
      account_type: role,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Erro ao criar conta", description: error.message, variant: "destructive" });
    } else {
      setStep("done");
    }
  };

  const stepNumber = { info: 1, role: 2, credentials: 3, done: 4 };

  const goBack = () => {
    if (step === "role") setStep("info");
    else if (step === "credentials") setStep("role");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
        {step !== "done" && (
          <div className="flex flex-col items-center mb-6">
            <img src={sementeLogo} alt="Semente" width={56} height={56} className="mb-1" />
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary" /> Criar conta
            </h1>
            <div className="mt-4 flex w-full gap-1.5">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${stepNumber[step] >= s ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Passo {Math.min(stepNumber[step], 3)} de 3</p>
          </div>
        )}

        {step !== "done" && step !== "info" && (
          <button onClick={goBack} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
            <ChevronLeft className="h-4 w-4" /> Voltar
          </button>
        )}

        <AnimatePresence mode="wait">
          {step === "info" && (
            <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Nome completo</label>
                <Input placeholder="Maria da Silva" value={nome} onChange={(e) => setNome(e.target.value)} className="h-12 rounded-xl text-base" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">CPF</label>
                <Input placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} className="h-12 rounded-xl text-base" inputMode="numeric" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Telefone</label>
                <Input type="tel" placeholder="(11) 98765-4321" value={telefone} onChange={(e) => setTelefone(formatPhone(e.target.value))} className="h-12 rounded-xl text-base" />
              </div>
              <Button onClick={handleInfoNext} className="h-12 w-full rounded-xl text-base font-semibold">Continuar</Button>
            </motion.div>
          )}

          {step === "role" && (
            <motion.div key="role" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <p className="text-sm font-medium text-foreground">Qual o tipo da sua conta?</p>
              {(["morador", "comerciante"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-colors ${role === r ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${role === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {r === "morador" ? "🏠" : "🏪"}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{r === "morador" ? "Morador" : "Comerciante"}</p>
                    <p className="text-xs text-muted-foreground">{r === "morador" ? "Pessoa física da comunidade" : "Loja ou negócio local"}</p>
                  </div>
                  {role === r && <Check className="ml-auto h-5 w-5 text-primary" />}
                </button>
              ))}
              <Button onClick={handleRoleNext} className="h-12 w-full rounded-xl text-base font-semibold">Continuar</Button>
            </motion.div>
          )}

          {step === "credentials" && (
            <motion.div key="credentials" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Digite seu e-mail</label>
                <Input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl text-base" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Crie uma senha</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl text-base pr-12"
                    onKeyDown={(e) => e.key === "Enter" && handleCreateAccount()}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${passwordStrength().color} ${passwordStrength().width}`} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Força: {passwordStrength().label}</p>
                  </div>
                )}
              </div>
              <Button onClick={handleCreateAccount} disabled={loading} className="h-12 w-full rounded-xl text-base font-semibold">
                {loading ? "Criando conta..." : "Criar conta"}
              </Button>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Conta criada com sucesso!</h2>
              <p className="text-sm text-muted-foreground">
                Bem-vindo(a) à comunidade Semente, {nome.split(" ")[0]}! Verifique seu e-mail para confirmar sua conta.
              </p>
              <Button onClick={() => navigate("/login")} className="h-12 w-full rounded-xl text-base font-semibold">
                Ir para login
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {step !== "done" && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/login" className="font-semibold text-primary">Entrar</Link>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default SignupPage;
