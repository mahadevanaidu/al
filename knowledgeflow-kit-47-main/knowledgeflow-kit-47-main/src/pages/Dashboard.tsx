import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { InteractiveWidget } from "@/components/dashboard/InteractiveWidget";
import { NotificationSystem, useNotifications } from "@/components/ui/NotificationSystem";
import { AdvancedAnalytics } from "@/components/analytics/AdvancedAnalytics";
import { Leaderboard } from "@/components/gamification/Leaderboard";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Trophy, Settings, Home } from "lucide-react";

const Dashboard = () => {
  const { notifications, addNotification, removeNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "leaderboard">("overview");

  // Demo notifications
  React.useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        type: "achievement",
        title: "New Achievement Unlocked!",
        message: "You've completed your first week of learning!",
        duration: 5000,
        action: {
          label: "View Badge",
          onClick: () => console.log("View achievement")
        }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [addNotification]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole="student" userName="Alex Johnson" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 p-1 bg-card/50 rounded-xl backdrop-blur-sm border border-primary/20"
          >
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "analytics", label: "Analytics", icon: BarChart },
              { id: "leaderboard", label: "Leaderboard", icon: Trophy }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center space-x-2 transition-all duration-300"
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <StudentDashboard />
                
                {/* Interactive Widgets Section */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  <InteractiveWidget
                    title="Learning Progress"
                    type="progress"
                  />
                  <InteractiveWidget
                    title="Daily Challenge"
                    type="challenge"
                  />
                  <InteractiveWidget
                    title="Achievements"
                    type="achievement"
                  />
                  <InteractiveWidget
                    title="Study Timer"
                    type="timer"
                  />
                </motion.section>
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AdvancedAnalytics />
              </motion.div>
            )}

            {activeTab === "leaderboard" && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Leaderboard 
                  timeRange="weekly"
                  category="overall"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
      
      <NotificationSystem
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  );
};

export default Dashboard;