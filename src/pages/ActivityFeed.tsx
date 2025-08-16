import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle2,
  Navigation,
  Database,
  Zap,
  Camera
} from "lucide-react";

const ActivityFeed = () => {
  const recentActivity = [
    {
      id: 1,
      type: "location",
      icon: MapPin,
      title: "Location shared with group",
      subtitle: "Downtown Plaza • 3 minutes ago",
      status: "safe",
      details: "GPS coordinates automatically shared"
    },
    {
      id: 2,
      type: "backup",
      icon: Database,
      title: "Evidence auto-backup completed",
      subtitle: "3 files secured • 8 minutes ago",
      status: "secured",
      details: "All recordings safely encrypted"
    },
    {
      id: 3,
      type: "zone",
      icon: Shield,
      title: "Entered monitored safe zone",
      subtitle: "City Center Mall • 15 minutes ago",
      status: "safe-zone",
      details: "24/7 security monitoring active"
    },
    {
      id: 4,
      type: "contact",
      icon: Users,
      title: "Emergency contact updated",
      subtitle: "Sarah Chen added • 1 hour ago",
      status: "updated",
      details: "Contact verification completed"
    },
    {
      id: 5,
      type: "system",
      icon: Zap,
      title: "System health check completed",
      subtitle: "All systems operational • 2 hours ago",
      status: "healthy",
      details: "GPS, emergency services, and backup systems verified"
    },
    {
      id: 6,
      type: "recording",
      icon: Camera,
      title: "Evidence recording started",
      subtitle: "Park Avenue • 3 hours ago",
      status: "recorded",
      details: "5 minute recording automatically saved"
    }
  ];

  const statistics = [
    {
      label: "Evidence Files Secured",
      value: "15",
      subtitle: "Auto-backup enabled",
      color: "success",
      icon: Database
    },
    {
      label: "Community Guardians",
      value: "247",
      subtitle: "Active in your area",
      color: "primary",
      icon: Users
    },
    {
      label: "Safe Zones Nearby",
      value: "12",
      subtitle: "Within 2km radius",
      color: "success",
      icon: Shield
    }
  ];

  const getActivityStyle = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-success-light border-success/20";
      case "secured":
        return "bg-primary/5 border-primary/20";
      case "safe-zone":
        return "bg-success-light border-success/20";
      case "updated":
        return "bg-primary/5 border-primary/20";
      case "healthy":
        return "bg-success-light border-success/20";
      case "recorded":
        return "bg-warning-light border-warning/20";
      default:
        return "bg-muted/5 border-muted/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
      case "safe-zone":
      case "healthy":
        return "bg-success/10 text-success";
      case "secured":
      case "updated":
        return "bg-primary/10 text-primary";
      case "recorded":
        return "bg-warning/10 text-warning";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "safe":
        return "Safe";
      case "secured":
        return "Secured";
      case "safe-zone":
        return "Safe Zone";
      case "updated":
        return "Updated";
      case "healthy":
        return "Healthy";
      case "recorded":
        return "Recorded";
      default:
        return "Active";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div>
            <h1 className="text-xl font-bold text-foreground">SecureSphere</h1>
            <p className="text-sm text-muted-foreground">Safety Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Navigation className="h-5 w-5" />
            </Button>
            <Badge variant="secondary" className="bg-protected text-protected-foreground">
              <Shield className="h-3 w-3 mr-1" />
              Protected
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Recent Activity</h2>
          <p className="text-muted-foreground text-sm">
            Track your safety actions and system updates
          </p>
        </div>

        {/* Activity Feed */}
        <section className="space-y-4">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            
            return (
              <Card 
                key={activity.id} 
                className={`p-4 transition-all duration-200 hover:shadow-md ${getActivityStyle(activity.status)}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{activity.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{activity.subtitle}</p>
                        <p className="text-xs text-muted-foreground mt-1 opacity-75">{activity.details}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ml-2 ${getStatusColor(activity.status)}`}
                      >
                        {getStatusLabel(activity.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </section>

        {/* Statistics */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Security Statistics</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              
              return (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      stat.color === "success" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className={`text-2xl font-bold ${
                        stat.color === "success" ? "text-success" : "text-primary"
                      }`}>
                        {stat.value}
                      </div>
                      <p className="text-sm font-medium">{stat.label}</p>
                      <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* System Status */}
        <section>
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Real-time Sync</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-xs text-success">Active</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Emergency Services Connection</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-xs text-success">Connected</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">GPS Accuracy</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-xs text-success">High (±3m)</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Backup Status</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-xs text-success">Up to date</span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Performance Summary */}
        <Card className="p-4 bg-gradient-primary text-white">
          <div className="text-center space-y-2">
            <h3 className="font-bold text-lg">🛡️ Your Safety Score</h3>
            <div className="text-3xl font-bold">98%</div>
            <p className="text-sm opacity-90">
              Excellent security coverage with active monitoring and up-to-date emergency contacts
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <div className="text-lg font-bold">100%</div>
                <div className="text-xs opacity-75">GPS Active</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">24/7</div>
                <div className="text-xs opacity-75">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">&lt;30s</div>
                <div className="text-xs opacity-75">Response Time</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ActivityFeed;