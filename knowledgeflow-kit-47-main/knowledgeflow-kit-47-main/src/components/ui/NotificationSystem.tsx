import { motion, AnimatePresence } from "framer-motion";
import { memo, useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, Zap, Trophy, Brain } from "lucide-react";
import { Button } from "./button";

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info" | "achievement" | "learning";
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export const NotificationSystem = memo(({ notifications, onRemove }: NotificationSystemProps) => {
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case "info":
        return <Info className="w-5 h-5 text-primary" />;
      case "achievement":
        return <Trophy className="w-5 h-5 text-warning" />;
      case "learning":
        return <Brain className="w-5 h-5 text-learning" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getNotificationStyles = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "border-success/20 bg-success/5 hover:bg-success/10";
      case "error":
        return "border-destructive/20 bg-destructive/5 hover:bg-destructive/10";
      case "warning":
        return "border-warning/20 bg-warning/5 hover:bg-warning/10";
      case "info":
        return "border-primary/20 bg-primary/5 hover:bg-primary/10";
      case "achievement":
        return "border-warning/20 bg-gradient-to-r from-warning/10 to-warning/5 hover:from-warning/20 hover:to-warning/10";
      case "learning":
        return "border-learning/20 bg-gradient-to-r from-learning/10 to-primary/5 hover:from-learning/20 hover:to-primary/10";
      default:
        return "border-primary/20 bg-primary/5 hover:bg-primary/10";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={onRemove}
            icon={getNotificationIcon(notification.type)}
            styles={getNotificationStyles(notification.type)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
  icon: React.ReactNode;
  styles: string;
}

const NotificationItem = memo(({ notification, onRemove, icon, styles }: NotificationItemProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onRemove(notification.id), 300);
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.duration, notification.id, onRemove]);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(notification.id), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 300, 
        scale: isVisible ? 1 : 0.8 
      }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`relative p-4 rounded-lg border backdrop-blur-sm shadow-elevated transition-all duration-300 ${styles}`}
    >
      <div className="flex items-start space-x-3">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {icon}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <motion.h4 
            className="font-semibold text-sm text-foreground"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {notification.title}
          </motion.h4>
          <motion.p 
            className="text-xs text-muted-foreground mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {notification.message}
          </motion.p>
          
          {notification.action && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3"
            >
              <Button
                size="sm"
                variant="outline"
                onClick={notification.action.onClick}
                className="text-xs h-7 hover:shadow-learning transition-all duration-300"
              >
                <Zap className="w-3 h-3 mr-1" />
                {notification.action.label}
              </Button>
            </motion.div>
          )}
        </div>
        
        <motion.button
          onClick={handleRemove}
          className="flex-shrink-0 p-1 rounded-md hover:bg-background/50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>
      
      {/* Progress bar for timed notifications */}
      {notification.duration && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-primary/30 rounded-b-lg"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: notification.duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
});

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    setNotifications(prev => [...prev, newNotification]);
    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll
  };
};
