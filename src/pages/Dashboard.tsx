import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MessageSquare, FileText, CreditCard, LifeBuoy } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    setProfile(data);
  };

  const quickActions = [
    {
      title: "Domains",
      description: "Manage your domain registrations",
      icon: Globe,
      path: "/dashboard/domains",
    },
    {
      title: "Websites",
      description: "Manage your websites",
      icon: Globe,
      path: "/dashboard/websites",
    },
    {
      title: "Chatbots",
      description: "Configure AI chatbots",
      icon: MessageSquare,
      path: "/dashboard/chatbots",
    },
    {
      title: "Invoices",
      description: "View and pay invoices",
      icon: FileText,
      path: "/dashboard/invoices",
    },
    {
      title: "Transactions",
      description: "View payment history",
      icon: CreditCard,
      path: "/dashboard/transactions",
    },
    {
      title: "Support",
      description: "Get help from our team",
      icon: LifeBuoy,
      path: "/dashboard/support",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}!</h1>
          <p className="text-muted-foreground">Manage your account and services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Card
              key={action.path}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(action.path)}
            >
              <CardHeader>
                <action.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
