import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sprout, ChevronLeft, Check } from "lucide-react";
import sementeLogo from "@/assets/semente-logo.png";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ForgotPasswordPage = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email) {
      toast({ title: "E-mail obrigatório", description: "Digite seu e-mail cadastrado.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={sementeLogo} alt="Semente" width={56} height={56} className="mb-1" />
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" /> Recuperar senha
          </h1>
        </div>

        {!sent ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Digite o e-mail cadastrado e enviaremos um link para redefinir sua senha.
            </p>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Seu e-mail</label>
              <Input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl text-base" />
            </div>
            <Button onClick={handleSend} disabled={loading} className="h-12 w-full rounded-xl text-base font-semibold">
              {loading ? "Enviando..." : "Enviar link"}
            </Button>
            <Link to="/login" className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <ChevronLeft className="h-4 w-4" /> Voltar para login
            </Link>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground">E-mail enviado!</h2>
            <p className="text-sm text-muted-foreground">
              Verifique sua caixa de entrada em <span className="font-semibold text-foreground">{email}</span>
            </p>
            <Link to="/login">
              <Button variant="outline" className="h-12 rounded-xl text-base">Voltar para login</Button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
