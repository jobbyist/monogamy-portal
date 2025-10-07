import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Websites = () => {
  const [websites, setWebsites] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    const { data, error } = await supabase
      .from("websites")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch websites",
        variant: "destructive",
      });
    } else {
      setWebsites(data || []);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Websites</h1>
            <p className="text-muted-foreground">Manage your websites</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Website
          </Button>
        </div>

        {websites.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No websites yet</CardTitle>
              <CardDescription>Add your first website to get started</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-4">
            {websites.map((website) => (
              <Card key={website.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {website.name}
                        {website.url && (
                          <a href={website.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </CardTitle>
                      <CardDescription>{website.url || "No URL set"}</CardDescription>
                    </div>
                    <Badge variant={website.status === "active" ? "default" : "secondary"}>
                      {website.status}
                    </Badge>
                  </div>
                </CardHeader>
                {website.deployment_url && (
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Deployment: {website.deployment_url}
                    </div>
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

export default Websites;
