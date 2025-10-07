import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Info, AlertCircle, CheckCircle } from "lucide-react";

const Updates = () => {
  const updates = [
    {
      id: 1,
      type: "feature",
      title: "New Dashboard Navigation",
      description: "We've added a collapsible navigation menu for better mobile experience. Access all your tools easily from any device.",
      date: "2025-01-15",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      id: 2,
      type: "info",
      title: "Platform Updates Available",
      description: "Enhanced language and currency preferences are now available in your profile settings. Customize your experience to match your location.",
      date: "2025-01-14",
      icon: Info,
      color: "text-blue-500"
    },
    {
      id: 3,
      type: "maintenance",
      title: "Scheduled Maintenance",
      description: "We will be performing routine maintenance on January 20th from 2:00 AM to 4:00 AM EST. Some services may be temporarily unavailable.",
      date: "2025-01-10",
      icon: AlertCircle,
      color: "text-orange-500"
    },
    {
      id: 4,
      type: "feature",
      title: "AI-Powered Chatbots Enhanced",
      description: "Our chatbot service now includes improved natural language processing and better context awareness for more accurate responses.",
      date: "2025-01-08",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      id: 5,
      type: "info",
      title: "Security Update",
      description: "We've implemented additional security measures to protect your data. Two-factor authentication is now available for all accounts.",
      date: "2025-01-05",
      icon: Info,
      color: "text-blue-500"
    }
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "feature":
        return "New Feature";
      case "info":
        return "Information";
      case "maintenance":
        return "Maintenance";
      default:
        return "Update";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-green-500";
      case "info":
        return "bg-blue-500";
      case "maintenance":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Updates & Notifications</h1>
          <p className="text-muted-foreground">Stay informed about platform updates, new features, and important announcements</p>
        </div>

        <div className="space-y-4">
          {updates.map((update) => {
            const IconComponent = update.icon;
            return (
              <Card key={update.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <IconComponent className={`h-5 w-5 mt-1 ${update.color}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{update.title}</CardTitle>
                          <Badge className={getTypeBadgeColor(update.type)}>
                            {getTypeLabel(update.type)}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground">
                          {new Date(update.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{update.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {updates.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No updates yet</h3>
              <p className="text-muted-foreground">Check back later for important notifications and announcements</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Updates;
