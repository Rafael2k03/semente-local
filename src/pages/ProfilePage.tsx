import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Shield, Bell, HelpCircle, LogOut, Settings, Award, Store } from "lucide-react";
import { currentUser } from "@/lib/mock-data";

const menuItems = [
  { icon: Shield, label: "Dados pessoais", desc: "Nome, CPF, telefone" },
  { icon: Settings, label: "Configurações", desc: "Limites e preferências" },
  { icon: Award, label: "Programa de pontos", desc: "Suas recompensas" },
  { icon: Store, label: "Comerciantes parceiros", desc: "Onde usar Semente" },
  { icon: Bell, label: "Notificações", desc: "Alertas e avisos" },
  { icon: HelpCircle, label: "Ajuda", desc: "Perguntas frequentes" },
];

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-hero px-4 pb-10 pt-4 text-primary-foreground">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <button onClick={() => navigate(-1)} className="rounded-full p-2 hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">Meu Perfil</h1>
        </div>
      </div>

      <div className="mx-auto -mt-6 max-w-lg px-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-card p-5 shadow-card">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              {currentUser.name[0]}
            </div>
            <div>
              <p className="font-semibold text-foreground">{currentUser.name}</p>
              <p className="text-sm text-muted-foreground">{currentUser.phone}</p>
              <span className="mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                {currentUser.role === "resident" ? "Morador" : currentUser.role === "merchant" ? "Comerciante" : "Administrador"}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="mt-4 divide-y divide-border rounded-2xl bg-card shadow-card">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
                <item.icon className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4">
          <button
            onClick={() => navigate("/login")}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-card p-4 text-sm font-medium text-destructive shadow-card transition-colors hover:bg-destructive/5"
          >
            <LogOut className="h-4 w-4" /> Sair da conta
          </button>
        </motion.div>

        <button
          onClick={() => navigate("/admin")}
          className="mt-4 w-full text-center text-xs text-muted-foreground underline"
        >
          Painel administrativo
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
