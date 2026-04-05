import { ArrowUpRight, ArrowDownLeft, RefreshCw, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const actions = [
  { icon: ArrowUpRight, label: "Enviar", path: "/transferir", color: "bg-primary/10 text-primary" },
  { icon: ArrowDownLeft, label: "Receber", path: "/receber", color: "bg-accent text-accent-foreground" },
  { icon: RefreshCw, label: "Converter", path: "/converter", color: "bg-secondary/15 text-secondary" },
  { icon: QrCode, label: "QR Code", path: "/qrcode", color: "bg-info/10 text-info" },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, i) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.05 }}
          onClick={() => navigate(action.path)}
          className="flex flex-col items-center gap-2"
        >
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.color} transition-transform active:scale-95`}>
            <action.icon className="h-6 w-6" />
          </div>
          <span className="text-xs font-medium text-foreground">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
