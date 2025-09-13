import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { memo } from "react";
import { motion } from "framer-motion";

interface ProgressCardProps {
  title: string;
  value: number;
  maxValue?: number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  unit?: string;
  description?: string;
}

export const ProgressCard = memo(({
  title,
  value,
  maxValue = 100,
  change,
  changeType = "neutral",
  unit = "%",
  description,
}: ProgressCardProps) => {
  const percentage = (value / maxValue) * 100;

  const getTrendIcon = () => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "decrease":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (changeType) {
      case "increase":
        return "text-success";
      case "decrease":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="shadow-card hover:shadow-elevated transition-all duration-300 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {title}
          </CardTitle>
          {change !== undefined && (
            <motion.div 
              className="flex items-center space-x-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {getTrendIcon()}
              <span className={`text-xs font-medium ${getTrendColor()}`}>
                {change > 0 ? "+" : ""}{change}{unit}
              </span>
            </motion.div>
          )}
        </CardHeader>
        <CardContent>
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-2xl font-bold bg-gradient-learning bg-clip-text text-transparent">
              {value}{unit}
            </div>
          </motion.div>
          {maxValue !== 100 && (
            <motion.div 
              className="mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Progress 
                value={percentage} 
                className="h-2 group-hover:h-3 transition-all duration-300" 
              />
              <p className="text-xs text-muted-foreground mt-1">
                {value} of {maxValue} {unit.replace('%', 'points')}
              </p>
            </motion.div>
          )}
          {description && (
            <motion.p 
              className="text-xs text-muted-foreground mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {description}
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
});