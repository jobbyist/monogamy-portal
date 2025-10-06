import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Chatbots = () => {
  const [chatbots, setChatbots] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchChatbots();
  }, []);

  const fetchChatbots = async () => {
    const { data, error } = await supabase
      .from("chatbot_configs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch chatbots",
        variant: "destructive",
      });
    } else {
      setChatbots(data || []);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">AI Chatbots</h1>
            <p className="text-muted-foreground">Configure and manage your chatbots</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Chatbot
          </Button>
        </div>

        {chatbots.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No chatbots yet</CardTitle>
              <CardDescription>Create your first AI chatbot</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-4">
            {chatbots.map((chatbot) => (
              <Card key={chatbot.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Bot className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle>{chatbot.name}</CardTitle>
                        <CardDescription>Model: {chatbot.model}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={chatbot.is_active ? "default" : "secondary"}>
                      {chatbot.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                {chatbot.system_prompt && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {chatbot.system_prompt}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Chatbots;
