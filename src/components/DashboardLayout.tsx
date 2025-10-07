import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Globe, MessageSquare, FileText, CreditCard, LifeBuoy, LayoutDashboard, LogOut, Settings, Briefcase, User, Menu, X, Bell } from "lucide-react";
import monogamyLogo from "@/assets/monogamy-logo.png";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
    } else {
      setUser(user);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Globe, label: "Domains", path: "/dashboard/domains" },
    { icon: Globe, label: "Websites", path: "/dashboard/websites" },
    { icon: MessageSquare, label: "Chatbots", path: "/dashboard/chatbots" },
    { icon: Briefcase, label: "Services", path: "/dashboard/services" },
    { icon: FileText, label: "Invoices", path: "/dashboard/invoices" },
    { icon: CreditCard, label: "Transactions", path: "/dashboard/transactions" },
    { icon: User, label: "Profile", path: "/dashboard/profile" },
    { icon: Bell, label: "Updates", path: "/dashboard/updates" },
    { icon: LifeBuoy, label: "Support", path: "/dashboard/support" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <Link to="/dashboard">
                <img src={monogamyLogo} alt="Monogamy" className="h-8" />
              </Link>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside className={`
          fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-background p-6 overflow-y-auto z-40
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}>
                <Button
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-8 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
