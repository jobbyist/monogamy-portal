import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Domains from "./pages/Domains";
import Websites from "./pages/Websites";
import Chatbots from "./pages/Chatbots";
import Invoices from "./pages/Invoices";
import Transactions from "./pages/Transactions";
import Support from "./pages/Support";
import UserServices from "./pages/UserServices";
import Profile from "./pages/Profile";
import FloatingChatbot from "./components/FloatingChatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/domains" element={<Domains />} />
          <Route path="/dashboard/websites" element={<Websites />} />
          <Route path="/dashboard/chatbots" element={<Chatbots />} />
          <Route path="/dashboard/services" element={<UserServices />} />
          <Route path="/dashboard/invoices" element={<Invoices />} />
          <Route path="/dashboard/transactions" element={<Transactions />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/support" element={<Support />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
