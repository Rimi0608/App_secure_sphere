import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Users, 
  Video, 
  Mic, 
  Shield, 
  MapPin, 
  Battery, 
  Volume2, 
  Camera,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const EmergencySOS = () => {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [sosCountdown, setSOSCountdown] = useState(0);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [tapCount, setTapCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  // Status indicators
  const statusCards = [
    {
      icon: Shield,
      label: "Protected",
      status: "24/7 Active",
      color: "success",
      active: true
    },
    {
      icon: MapPin,
      label: "GPS Active", 
      status: "Precise Location",
      color: "primary",
      active: true
    },
    {
      icon: Battery,
      label: "73% Normal",
      status: "6h Remaining", 
      color: "success",
      active: true
    },
    {
      icon: Users,
      label: "3 Connected",
      status: "Group Members",
      color: "primary", 
      active: true
    }
  ];

  // Handle triple tap detection
  useEffect(() => {
    if (tapCount === 3) {
      activateSOS();
      setTapCount(0);
    }
    
    const timer = setTimeout(() => {
      setTapCount(0);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [tapCount]);

  // Handle SOS countdown
  useEffect(() => {
    if (sosCountdown > 0) {
      const timer = setTimeout(() => {
        setSOSCountdown(sosCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (sosCountdown === 0 && isSOSActive) {
      setIsSOSActive(false);
    }
  }, [sosCountdown, isSOSActive]);

  const activateSOS = useCallback(() => {
    setIsSOSActive(true);
    setSOSCountdown(5);
    toast({
      title: "SOS Activated",
      description: "Emergency response initiated",
      variant: "destructive"
    });
  }, [toast]);

  const handleSOSPress = useCallback(() => {
    setTapCount(prev => prev + 1);
  }, []);

  const handleSOSLongPressStart = useCallback(() => {
    const timer = setTimeout(() => {
      activateSOS();
    }, 1500); // 1.5 second long press
    setLongPressTimer(timer);
  }, [activateSOS]);

  const handleSOSLongPressEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  }, [longPressTimer]);

  const handleEmergencyAction = (action: string) => {
    switch (action) {
      case "call112":
        toast({
          title: "Calling 112",
          description: "Emergency call initiated with location sharing",
          variant: "destructive"
        });
        break;
      case "alertGroup":
        toast({
          title: "Group Alert Sent",
          description: "Emergency message sent to your trusted contacts",
          variant: "destructive"
        });
        break;
      case "record":
        setIsRecording(!isRecording);
        toast({
          title: isRecording ? "Recording Stopped" : "Recording Started",
          description: isRecording ? "Evidence saved securely" : "Audio and video recording started",
          variant: isRecording ? "default" : "destructive"
        });
        break;
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
          <Badge variant="secondary" className="bg-protected text-protected-foreground">
            <Shield className="h-3 w-3 mr-1" />
            Protected
          </Badge>
        </div>
      </header>

      <div className="max-w-md mx-auto p-6 space-y-8">
        {/* Emergency SOS Section */}
        <section className="text-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Emergency SOS</h2>
            <p className="text-muted-foreground text-sm">
              Triple tap • Voice command • Long press
            </p>
          </div>

          {/* SOS Button */}
          <div className="relative flex items-center justify-center">
            <div className={cn(
              "relative w-48 h-48 rounded-full border-4 transition-all duration-300",
              isSOSActive 
                ? "border-emergency bg-emergency/10 animate-pulse-glow" 
                : "border-emergency/30 bg-emergency/5 hover:border-emergency/50"
            )}>
              <button
                className={cn(
                  "absolute inset-4 rounded-full bg-emergency text-emergency-foreground",
                  "flex items-center justify-center text-6xl font-bold",
                  "transition-all duration-200 hover:scale-105 active:scale-95",
                  "focus:outline-none focus:ring-4 focus:ring-emergency/30"
                )}
                onMouseDown={handleSOSLongPressStart}
                onMouseUp={handleSOSLongPressEnd}
                onMouseLeave={handleSOSLongPressEnd}
                onTouchStart={handleSOSLongPressStart}
                onTouchEnd={handleSOSLongPressEnd}
                onClick={handleSOSPress}
              >
                {sosCountdown > 0 ? sosCountdown : "SOS"}
              </button>
            </div>
          </div>

          {/* Voice Activation */}
          <Button variant="outline" className="bg-primary/5 border-primary/20 text-primary">
            <Volume2 className="h-4 w-4 mr-2" />
            Voice Activation
          </Button>

          {/* Instructions */}
          <div className="text-center space-y-2">
            <h3 className="font-bold text-lg">EMERGENCY SOS</h3>
            <p className="text-sm text-muted-foreground">
              Triple tap • Voice command • Long press
            </p>
          </div>
        </section>

        {/* Status Cards */}
        <section className="grid grid-cols-2 gap-4">
          {statusCards.map((card, index) => (
            <Card key={index} className={cn(
              "p-4 text-center transition-all duration-200",
              card.active && "ring-2 ring-primary/20"
            )}>
              <div className="space-y-2">
                <div className={cn(
                  "w-12 h-12 rounded-full mx-auto flex items-center justify-center",
                  card.color === "success" ? "bg-success text-success-foreground" :
                  card.color === "primary" ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                )}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div>
                  <Badge variant={card.active ? "default" : "secondary"} className={cn(
                    "text-xs",
                    card.color === "success" && card.active && "bg-success text-success-foreground",
                    card.color === "primary" && card.active && "bg-primary text-primary-foreground"
                  )}>
                    {card.label}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{card.status}</p>
                </div>
              </div>
            </Card>
          ))}
        </section>

        {/* Quick Actions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <Badge variant="secondary" className="bg-protected text-protected-foreground">
              <Shield className="h-3 w-3 mr-1" />
              Protected
            </Badge>
          </div>

          <div className="space-y-4">
            {/* Primary Emergency Action */}
            <Button 
              className="w-full h-14 bg-emergency text-emergency-foreground hover:bg-emergency/90 text-lg font-semibold"
              onClick={() => handleEmergencyAction("call112")}
            >
              <Phone className="h-6 w-6 mr-3" />
              Call 112
            </Button>

            <Button 
              variant="outline" 
              className="w-full h-12 border-emergency/30 text-emergency hover:bg-emergency/5"
              onClick={() => handleEmergencyAction("alertGroup")}
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alert Group
            </Button>

            {/* Secondary Actions */}
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className={cn(
                  "h-16 flex-col space-y-1",
                  isRecording && "bg-emergency/10 border-emergency text-emergency"
                )}
                onClick={() => handleEmergencyAction("record")}
              >
                <Video className="h-5 w-5" />
                <span className="text-xs">Siren</span>
                <span className="text-xs text-muted-foreground">Standby</span>
              </Button>

              <Button 
                variant="outline"
                className="h-16 flex-col space-y-1 border-warning/30 text-warning hover:bg-warning/5"
              >
                <Camera className="h-5 w-5" />
                <span className="text-xs">Strobe</span>
                <span className="text-xs text-muted-foreground">Standby</span>
              </Button>

              <Button 
                variant="outline"
                className={cn(
                  "h-16 flex-col space-y-1",
                  isRecording && "bg-primary/10 border-primary text-primary"
                )}
                onClick={() => handleEmergencyAction("record")}
              >
                <Mic className="h-5 w-5" />
                <span className="text-xs">Record</span>
                <span className="text-xs text-muted-foreground">Evidence</span>
                <span className="text-xs text-muted-foreground">Standby</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Emergency Alert Banner */}
        {isSOSActive && (
          <Card className="p-4 bg-emergency text-emergency-foreground animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6" />
                <div>
                  <p className="font-bold">Emergency Alert Active</p>
                  <p className="text-sm opacity-90">Help is on the way</p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setIsSOSActive(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmergencySOS;
