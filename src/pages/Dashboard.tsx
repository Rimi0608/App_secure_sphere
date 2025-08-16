import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  MapPin, 
  Battery, 
  Users, 
  Phone, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Navigation
} from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [batteryLevel, setBatteryLevel] = useState(73);
  const [isProtected, setIsProtected] = useState(true);
  
  // Mock data for alerts and contacts
  const recentAlerts = [
    {
      id: 1,
      type: "emergency",
      title: "Active Emergency Nearby",
      description: "Emergency services responding to incident at Park Avenue intersection",
      location: "Park Avenue",
      time: "2 min ago",
      status: "active"
    },
    {
      id: 2,
      type: "warning", 
      title: "Poor Lighting Reported",
      description: "Multiple users report broken street lights in downtown area",
      location: "Downtown Plaza",
      time: "15 min ago",
      helpful: 8
    },
    {
      id: 3,
      type: "safe",
      title: "New Safe Zone Added",
      description: "Shopping center now designated as community safe zone with 24/7 security",
      location: "City Center",
      time: "2 hours ago",
      helpful: 45
    }
  ];

  const emergencyContacts = [
    { name: "Sarah Chen", role: "Family", status: "safe", priority: "high" },
    { name: "Emergency Services", role: "911", status: "available", priority: "high" },
    { name: "Mike Johnson", role: "Friend", status: "safe", priority: "medium" }
  ];

  const recentActivity = [
    { type: "location", text: "Location shared with group", time: "3 minutes ago", status: "safe" },
    { type: "backup", text: "Evidence auto-backup completed", time: "8 minutes ago", status: "secured" },
    { type: "zone", text: "Entered monitored safe zone", time: "15 minutes ago", status: "safe-zone" }
  ];

  const stats = [
    { label: "Evidence Files Secured", value: "15", sublabel: "Auto-backup enabled" },
    { label: "Community Guardians", value: "247", sublabel: "Active in your area" },
    { label: "Safe Zones Nearby", value: "12", sublabel: "Within 2km radius" }
  ];

  return (
    <div className="min-h-screen bg-background">
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
        {/* Community Alerts */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Community Alerts
            </h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">4 Active</Badge>
              <Button variant="outline" size="sm">Report</Button>
            </div>
          </div>

          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <Card key={alert.id} className="p-4 border-l-4 border-l-emergency">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant={alert.type === "emergency" ? "destructive" : 
                               alert.type === "warning" ? "secondary" : "default"}
                        className="text-xs uppercase"
                      >
                        {alert.type === "emergency" ? "EMERGENCY" : 
                         alert.type === "warning" ? "MEDIUM" : "LOW"}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-sm">{alert.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {alert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {alert.time}
                      </span>
                      {alert.helpful && (
                        <span>{alert.helpful} helpful</span>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="ml-2">
                    {alert.type === "emergency" ? "View Details" : "View"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-4 bg-primary/5 border-primary/20 mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary">👥 247 active guardians</span>
              <span className="text-primary">🛡️ 12 safe zones</span>
              <span className="text-primary">Community powered safety</span>
            </div>
          </Card>
        </section>

        {/* Emergency Contacts */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Emergency Contacts
            </h2>
            <Button variant="outline" size="sm">Add</Button>
          </div>

          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-2 h-2 rounded-full ${
                        contact.status === "safe" ? "bg-success" : "bg-primary"
                      }`} />
                      {contact.priority === "high" && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 w-4 h-4 p-0 text-xs">
                          {contact.priority === "high" ? "HIGH" : ""}
                        </Badge>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{contact.name}</h3>
                      <p className="text-xs text-muted-foreground">{contact.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-success text-success-foreground">
                      <Phone className="h-4 w-4" />
                    </Button>
                    {contact.role !== "911" && (
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-4 bg-emergency text-emergency-foreground mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="font-medium">Emergency Services - 911</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Automatic location sharing enabled
              </Badge>
            </div>
          </Card>
        </section>

        {/* Power Status */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Battery className="h-5 w-5" />
              Power Status
            </h2>
            <Badge variant="outline" className="bg-success/10 text-success">Normal</Badge>
          </div>

          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-success">{batteryLevel}%</span>
                <span className="text-sm text-muted-foreground">21h remaining</span>
              </div>
              <Progress value={batteryLevel} className="h-2" />
              
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-2">Power Save Mode</p>
                <p>Disabled • All features active</p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <CheckCircle2 className="h-6 w-6 text-success mx-auto mb-1" />
                  <p className="text-xs font-medium">GPS</p>
                  <p className="text-xs text-muted-foreground">Always On</p>
                </div>
                <div className="text-center">
                  <CheckCircle2 className="h-6 w-6 text-success mx-auto mb-1" />
                  <p className="text-xs font-medium">Emergency</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <div className="text-center">
                  <CheckCircle2 className="h-6 w-6 text-success mx-auto mb-1" />
                  <p className="text-xs font-medium">Features</p>
                  <p className="text-xs text-muted-foreground">Full</p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full mt-4">
                Power Save Mode Off
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-primary/5 border-primary/20 mt-3">
            <div className="text-sm space-y-1">
              <p className="font-medium text-primary">💡 Power Tips</p>
              <p className="text-xs text-muted-foreground">• Emergency features stay active even at 0% battery</p>
              <p className="text-xs text-muted-foreground">• Enable power save mode to extend battery life</p>
              <p className="text-xs text-muted-foreground">• Wireless charging available in safe zones</p>
            </div>
          </Card>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <Card key={index} className={`p-4 ${
                activity.status === "safe" ? "bg-success-light border-success/20" :
                activity.status === "secured" ? "bg-primary/5 border-primary/20" :
                "bg-success-light border-success/20"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === "safe" ? "bg-success" :
                    activity.status === "secured" ? "bg-primary" : "bg-success"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className={`text-xs ${
                    activity.status === "safe" ? "bg-success/10 text-success" :
                    activity.status === "secured" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"
                  }`}>
                    {activity.status === "safe" ? "Safe" :
                     activity.status === "secured" ? "Secured" : "Safe Zone"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className="pb-8">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 text-center">
                <div className={`text-2xl font-bold ${
                  index === 0 ? "text-success" : 
                  index === 1 ? "text-primary" : "text-success"
                }`}>
                  {stat.value}
                </div>
                <p className="text-xs font-medium mt-1">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.sublabel}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;