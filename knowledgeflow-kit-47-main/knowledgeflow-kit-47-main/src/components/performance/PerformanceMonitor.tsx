import { motion } from "framer-motion";
import { memo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Zap, 
  Clock, 
  Cpu, 
  HardDrive, 
  Wifi,
  Battery,
  Thermometer,
  Gauge,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface PerformanceMetrics {
  cpu: number;
  memory: number;
  network: number;
  battery: number;
  temperature: number;
  loadTime: number;
  fps: number;
  errors: number;
}

interface PerformanceMonitorProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const PerformanceMonitor = memo(({ isVisible, onToggle }: PerformanceMonitorProps) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cpu: 0,
    memory: 0,
    network: 0,
    battery: 100,
    temperature: 0,
    loadTime: 0,
    fps: 0,
    errors: 0
  });

  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const updateMetrics = () => {
      // Simulate real-time performance data
      setMetrics(prev => ({
        cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.min(100, Math.max(0, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.min(100, Math.max(0, prev.network + (Math.random() - 0.5) * 15)),
        battery: Math.max(0, prev.battery - Math.random() * 0.1),
        temperature: Math.min(100, Math.max(0, prev.temperature + (Math.random() - 0.5) * 2)),
        loadTime: Math.random() * 2000 + 500,
        fps: Math.random() * 20 + 50,
        errors: prev.errors + (Math.random() > 0.95 ? 1 : 0)
      }));
    };

    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return "text-success";
    if (value <= thresholds.warning) return "text-warning";
    return "text-destructive";
  };

  const getStatusIcon = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return <CheckCircle className="w-4 h-4 text-success" />;
    if (value <= thresholds.warning) return <AlertTriangle className="w-4 h-4 text-warning" />;
    return <AlertTriangle className="w-4 h-4 text-destructive" />;
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 left-4 z-50 w-80"
    >
      <Card className="shadow-elevated bg-card/95 backdrop-blur-sm border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Activity className="w-5 h-5 text-primary" />
              <span>Performance Monitor</span>
              <Badge variant="outline" className="text-xs">
                Live
              </Badge>
            </CardTitle>
            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0"
              >
                {isMinimized ? "↑" : "↓"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onToggle}
                className="h-8 w-8 p-0"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-4">
              {/* System Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">CPU</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(metrics.cpu, { good: 50, warning: 80 })}
                      <span className={`text-sm font-bold ${getStatusColor(metrics.cpu, { good: 50, warning: 80 })}`}>
                        {metrics.cpu.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <Progress value={metrics.cpu} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Memory</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(metrics.memory, { good: 60, warning: 85 })}
                      <span className={`text-sm font-bold ${getStatusColor(metrics.memory, { good: 60, warning: 85 })}`}>
                        {metrics.memory.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <Progress value={metrics.memory} className="h-2" />
                </div>
              </div>

              {/* Network & Battery */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Network</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      {metrics.network.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={metrics.network} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Battery className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Battery</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      {metrics.battery.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={metrics.battery} className="h-2" />
                </div>
              </div>

              {/* Performance Indicators */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Load Time</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {metrics.loadTime.toFixed(0)}ms
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Gauge className="w-4 h-4 text-learning" />
                    <span className="text-sm font-medium">FPS</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {metrics.fps.toFixed(0)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium">Temperature</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {metrics.temperature.toFixed(1)}°C
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-medium">Errors</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {metrics.errors}
                  </span>
                </div>
              </div>

              {/* Performance Score */}
              <motion.div
                className="p-4 bg-gradient-to-r from-primary/10 to-learning/10 rounded-lg border border-primary/20"
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">Performance Score</span>
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {Math.round(100 - (metrics.cpu + metrics.memory + metrics.temperature) / 3)}
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-learning rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${100 - (metrics.cpu + metrics.memory + metrics.temperature) / 3}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            </CardContent>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
});
