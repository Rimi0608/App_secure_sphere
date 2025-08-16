import { useState } from "react";
import Dashboard from "./Dashboard";
import EmergencySOS from "./EmergencySOS";
import CommunityAlerts from "./CommunityAlerts";
import ActivityFeed from "./ActivityFeed";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "alerts":
        return <CommunityAlerts />;
      case "sos":
        return <EmergencySOS />;
      case "activity":
        return <ActivityFeed />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderActiveTab()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
