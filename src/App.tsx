import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TransferPage from "./pages/TransferPage";
import QRCodePage from "./pages/QRCodePage";
import HistoryPage from "./pages/HistoryPage";
import ConvertPage from "./pages/ConvertPage";
import ProfilePage from "./pages/ProfilePage";
import ReceivePage from "./pages/ReceivePage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/transferir" element={<TransferPage />} />
          <Route path="/qrcode" element={<QRCodePage />} />
          <Route path="/extrato" element={<HistoryPage />} />
          <Route path="/converter" element={<ConvertPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/receber" element={<ReceivePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
