import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Target, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

interface Recommendation {
  id: string;
  title: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedTime: string;
  reason: string;
  type: "practice" | "review" | "learn";
}

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "Binary Search Trees - Practice Problems",
    subject: "Data Structures",
    difficulty: "medium",
    estimatedTime: "30 min",
    reason: "Weak area identified in recent assessment",
    type: "practice",
  },
  {
    id: "2",
    title: "SQL Joins Review",
    subject: "DBMS",
    difficulty: "easy",
    estimatedTime: "15 min",
    reason: "Scheduled review based on spaced repetition",
    type: "review",
  },
  {
    id: "3",
    title: "Advanced Calculus - Limits",
    subject: "Math",
    difficulty: "hard",
    estimatedTime: "45 min",
    reason: "Next topic in your learning path",
    type: "learn",
  },
];

export const StudyRecommendations = memo(() => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-success/10 text-success hover:bg-success/20";
      case "medium":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "hard":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "practice":
        return <Target className="w-4 h-4" />;
      case "review":
        return <Brain className="w-4 h-4" />;
      case "learn":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "practice":
        return "text-primary";
      case "review":
        return "text-learning";
      case "learn":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-card hover:shadow-elevated transition-all duration-300 bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <div className="w-6 h-6 bg-gradient-learning rounded-md flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span>AI Study Recommendations</span>
            <Sparkles className="w-4 h-4 text-learning animate-pulse-slow" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockRecommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 border border-primary/20 rounded-xl hover:bg-accent/50 transition-all duration-300 group hover:shadow-learning hover:border-primary/40"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className={`p-2 rounded-lg ${getTypeColor(rec.type)} group-hover:scale-110 transition-transform`}
                    whileHover={{ rotate: 5 }}
                  >
                    {getTypeIcon(rec.type)}
                  </motion.div>
                  <div>
                    <h4 className="font-medium text-sm group-hover:text-foreground transition-colors">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground">{rec.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={`${getDifficultyColor(rec.difficulty)} group-hover:scale-105 transition-transform`}
                  >
                    {rec.difficulty}
                  </Badge>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3 group-hover:text-foreground/80 transition-colors">{rec.reason}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 group-hover:text-primary transition-colors" />
                  <span>{rec.estimatedTime}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-7 text-xs hover:bg-primary hover:text-primary-foreground hover:shadow-learning transition-all duration-300 group-hover:scale-105"
                >
                  Start
                </Button>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="ghost" className="w-full mt-4 hover:bg-primary/10 hover:text-primary transition-all duration-300">
              View All Recommendations
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
});