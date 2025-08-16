import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  ThumbsUp,
  Eye,
  Shield,
  Navigation
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: number;
  type: "emergency" | "warning" | "safe";
  title: string;
  description: string;
  location: string;
  time: string;
  helpful?: number;
  status?: string;
}

const CommunityAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
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
      title: "Safety Tip: Well-Lit Routes",
      description: "Use Main Street route after dark - well lit with security cameras",
      location: "Main Street",
      time: "1 hour ago",
      helpful: 24
    },
    {
      id: 4,
      type: "safe",
      title: "New Safe Zone Added",
      description: "Shopping center now designated as community safe zone with 24/7 security",
      location: "City Center",
      time: "2 hours ago",
      helpful: 45
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    description: "",
    location: "",
    type: "warning" as const
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const { toast } = useToast();

  const handleAddAlert = () => {
    if (!newAlert.title || !newAlert.description || !newAlert.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const alert: Alert = {
      id: Date.now(),
      ...newAlert,
      time: "Just now",
      helpful: 0
    };

    setAlerts(prev => [alert, ...prev]);
    setNewAlert({ title: "", description: "", location: "", type: "warning" });
    setIsDialogOpen(false);
    
    toast({
      title: "Alert Added",
      description: "Your community alert has been posted successfully",
    });
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || alert.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getAlertStyle = (type: string) => {
    switch (type) {
      case "emergency":
        return "border-l-emergency bg-emergency-light";
      case "warning":
        return "border-l-warning bg-warning-light";
      case "safe":
        return "border-l-success bg-success-light";
      default:
        return "border-l-muted";
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "emergency":
        return "destructive";
      case "warning":
        return "secondary";
      case "safe":
        return "default";
      default:
        return "secondary";
    }
  };

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
        {/* Community Alerts Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Community Alerts
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">4 Active</Badge>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary text-primary-foreground">
                  <Plus className="h-4 w-4 mr-1" />
                  Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md mx-auto">
                <DialogHeader>
                  <DialogTitle>Add Community Alert</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Alert Type</label>
                    <Select value={newAlert.type} onValueChange={(value: any) => setNewAlert(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency (Red)</SelectItem>
                        <SelectItem value="warning">Warning (Yellow)</SelectItem>
                        <SelectItem value="safe">Safe Zone (Green)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Title *</label>
                    <Input 
                      value={newAlert.title}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Brief alert title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description *</label>
                    <Textarea 
                      value={newAlert.description}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Detailed description of the situation"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location *</label>
                    <Input 
                      value={newAlert.location}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Specific location or area"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleAddAlert} className="flex-1">
                      Add Alert
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filterType === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterType("all")}
            >
              All
            </Button>
            <Button 
              variant={filterType === "emergency" ? "destructive" : "outline"} 
              size="sm"
              onClick={() => setFilterType("emergency")}
            >
              Emergency
            </Button>
            <Button 
              variant={filterType === "warning" ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setFilterType("warning")}
            >
              Warning
            </Button>
            <Button 
              variant={filterType === "safe" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterType("safe")}
              className={filterType === "safe" ? "bg-success text-success-foreground" : ""}
            >
              Safe
            </Button>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className={`p-4 border-l-4 ${getAlertStyle(alert.type)}`}>
              <div className="space-y-3">
                {/* Alert Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getBadgeVariant(alert.type)} className="text-xs uppercase">
                        {alert.type === "emergency" ? "EMERGENCY" : 
                         alert.type === "warning" ? "MEDIUM" : "LOW"}
                      </Badge>
                      {alert.status === "active" && (
                        <Badge variant="destructive" className="text-xs animate-pulse">
                          ACTIVE
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-base mb-1">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    {alert.type === "emergency" ? "View Details" : "View"}
                  </Button>
                </div>

                {/* Alert Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {alert.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </span>
                    {alert.helpful && (
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {alert.helpful} helpful
                      </span>
                    )}
                  </div>
                  {alert.type !== "emergency" && (
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Helpful
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Community Stats */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">247</div>
              <div className="text-xs text-muted-foreground">Active Guardians</div>
            </div>
            <div>
              <div className="text-lg font-bold text-success">12</div>
              <div className="text-xs text-muted-foreground">Safe Zones</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">Updates every 30s</div>
              <div className="text-xs text-muted-foreground">Real-time sync active</div>
            </div>
          </div>
        </Card>

        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <Card className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No alerts found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search or filters" : "No community alerts in your area"}
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setFilterType("all");
            }}>
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CommunityAlerts;