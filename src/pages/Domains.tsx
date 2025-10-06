import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Domains = () => {
  const [domains, setDomains] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    const { data, error } = await supabase
      .from("domains")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch domains",
        variant: "destructive",
      });
    } else {
      setDomains(data || []);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "expired": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Domains</h1>
            <p className="text-muted-foreground">Manage your domain registrations</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Register Domain
          </Button>
        </div>

        {domains.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No domains yet</CardTitle>
              <CardDescription>Register your first domain to get started</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-4">
            {domains.map((domain) => (
              <Card key={domain.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{domain.domain_name}</CardTitle>
                      <CardDescription>
                        Registered on {new Date(domain.registration_date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(domain.status)}>
                      {domain.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Expires: {domain.expiry_date ? new Date(domain.expiry_date).toLocaleDateString() : "N/A"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Domains;
