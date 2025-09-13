import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useState } from "react";
import { 
  Brain, 
  Target, 
  Zap, 
  TrendingUp, 
  Clock, 
  Star,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

interface InteractiveWidgetProps {
  title: string;
  type: "progress" | "challenge" | "achievement" | "timer";
  data?: any;
}

export const InteractiveWidget = memo(({ title, type, data }: InteractiveWidgetProps) => {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStart = () => {
    setIsActive(true);
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsActive(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleReset = () => {
    setIsActive(false);
    setProgress(0);
  };

  const renderWidget = () => {
    switch (type) {
      case "progress":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-learning rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">Learning Progress</span>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success">
                {progress}%
              </Badge>
            </div>
            
            <div className="space-y-2">
              <Progress 
                value={progress} 
                className="h-3 group-hover:h-4 transition-all duration-300"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Current Level</span>
                <span>Next Milestone</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={handleStart}
                disabled={isActive}
                className="flex-1 hover:shadow-learning transition-all duration-300"
              >
                <Play className="w-4 h-4 mr-2" />
                {isActive ? "In Progress..." : "Start Session"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                className="hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        );

      case "challenge":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">Daily Challenge</span>
              </div>
              <Badge variant="outline" className="bg-warning/10 text-warning">
                Active
              </Badge>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
              <h4 className="font-medium mb-2">Complete 5 Math Problems</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Solve problems to earn bonus points and unlock achievements
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>15 min remaining</span>
                </div>
                <Button size="sm" className="hover:shadow-learning transition-all duration-300">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Challenge
                </Button>
              </div>
            </div>
          </motion.div>
        );

      case "achievement":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">Recent Achievement</span>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                New!
              </Badge>
            </div>

            <motion.div
              className="bg-gradient-to-r from-primary/10 to-learning/10 rounded-lg p-4 border border-primary/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-12 h-12 bg-gradient-learning rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Trophy className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h4 className="font-medium">Streak Master</h4>
                  <p className="text-sm text-muted-foreground">
                    Completed 7 days in a row!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case "timer":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">Study Timer</span>
              </div>
              <Badge variant="outline" className={isActive ? "bg-success/10 text-success" : "bg-muted"}>
                {isActive ? "Running" : "Stopped"}
              </Badge>
            </div>

            <div className="text-center">
              <motion.div
                className="text-4xl font-bold bg-gradient-learning bg-clip-text text-transparent"
                animate={{ scale: isActive ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              >
                {Math.floor(progress / 60)}:{(progress % 60).toString().padStart(2, '0')}
              </motion.div>
              <p className="text-sm text-muted-foreground mt-2">Study Session</p>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={handleStart}
                disabled={isActive}
                className="flex-1 hover:shadow-learning transition-all duration-300"
              >
                {isActive ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                className="hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-card hover:shadow-elevated transition-all duration-300 bg-card/80 backdrop-blur-sm border-primary/20 group">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-learning rounded-md flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {renderWidget()}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
});
