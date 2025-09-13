import { motion } from "framer-motion";
import { memo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Target, 
  Clock, 
  Award,
  Zap,
  BookOpen,
  Users,
  Activity
} from "lucide-react";

interface AnalyticsData {
  performance: {
    overall: number;
    trend: number;
    subjects: Array<{
      name: string;
      score: number;
      improvement: number;
    }>;
  };
  learning: {
    hoursStudied: number;
    streak: number;
    completedLessons: number;
    averageSession: number;
  };
  engagement: {
    daily: Array<{ date: string; value: number }>;
    weekly: Array<{ week: string; value: number }>;
    monthly: Array<{ month: string; value: number }>;
  };
  skills: Array<{
    skill: string;
    level: number;
    progress: number;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    earned: boolean;
    progress: number;
  }>;
}

export const AdvancedAnalytics = memo(() => {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalyticsData({
        performance: {
          overall: 87,
          trend: 12,
          subjects: [
            { name: "Math", score: 92, improvement: 8 },
            { name: "Science", score: 85, improvement: 15 },
            { name: "Language", score: 78, improvement: 5 },
            { name: "History", score: 91, improvement: 22 }
          ]
        },
        learning: {
          hoursStudied: 42,
          streak: 15,
          completedLessons: 28,
          averageSession: 35
        },
        engagement: {
          daily: [
            { date: "Mon", value: 85 },
            { date: "Tue", value: 92 },
            { date: "Wed", value: 78 },
            { date: "Thu", value: 88 },
            { date: "Fri", value: 95 },
            { date: "Sat", value: 82 },
            { date: "Sun", value: 90 }
          ],
          weekly: [
            { week: "Week 1", value: 78 },
            { week: "Week 2", value: 85 },
            { week: "Week 3", value: 92 },
            { week: "Week 4", value: 88 }
          ],
          monthly: [
            { month: "Jan", value: 75 },
            { month: "Feb", value: 82 },
            { month: "Mar", value: 88 },
            { month: "Apr", value: 91 }
          ]
        },
        skills: [
          { skill: "Problem Solving", level: 85, progress: 75 },
          { skill: "Critical Thinking", level: 78, progress: 60 },
          { skill: "Memory", level: 92, progress: 90 },
          { skill: "Focus", level: 88, progress: 80 },
          { skill: "Speed", level: 76, progress: 65 }
        ],
        achievements: [
          { id: "1", title: "Streak Master", description: "Study for 7 days in a row", earned: true, progress: 100 },
          { id: "2", title: "Speed Learner", description: "Complete 10 lessons in one day", earned: false, progress: 60 },
          { id: "3", title: "Perfectionist", description: "Get 100% on 5 quizzes", earned: false, progress: 40 },
          { id: "4", title: "Night Owl", description: "Study after 10 PM for 5 days", earned: true, progress: 100 }
        ]
      });
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading || !analyticsData) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="h-64 bg-card/50 rounded-xl shimmer"
          />
        ))}
      </div>
    );
  }

  const getEngagementData = () => {
    switch (timeRange) {
      case "daily":
        return analyticsData.engagement.daily;
      case "weekly":
        return analyticsData.engagement.weekly;
      case "monthly":
        return analyticsData.engagement.monthly;
      default:
        return analyticsData.engagement.weekly;
    }
  };

  const skillData = analyticsData.skills.map(skill => ({
    subject: skill.skill,
    A: skill.level,
    B: skill.progress,
    fullMark: 100
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-learning bg-clip-text text-transparent">
            Advanced Analytics
          </h2>
          <p className="text-muted-foreground">Deep insights into your learning journey</p>
        </div>
        <div className="flex space-x-2">
          {(["daily", "weekly", "monthly"] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="capitalize"
            >
              {range}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Performance</p>
                <p className="text-3xl font-bold text-foreground">{analyticsData.performance.overall}%</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">+{analyticsData.performance.trend}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-learning rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hours Studied</p>
                <p className="text-3xl font-bold text-foreground">{analyticsData.learning.hoursStudied}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">This month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                <p className="text-3xl font-bold text-foreground">{analyticsData.learning.streak}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Zap className="w-4 h-4 text-warning" />
                  <span className="text-sm text-warning">Days</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lessons Completed</p>
                <p className="text-3xl font-bold text-foreground">{analyticsData.learning.completedLessons}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Award className="w-4 h-4 text-learning" />
                  <span className="text-sm text-muted-foreground">Total</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <span>Engagement Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={getEngagementData()}>
                  <defs>
                    <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                  <XAxis 
                    dataKey={timeRange === "daily" ? "date" : timeRange === "weekly" ? "week" : "month"}
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="url(#engagementGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-learning" />
                <span>Skills Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillData}>
                  <PolarGrid stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Radar
                    name="Current Level"
                    dataKey="A"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Progress"
                    dataKey="B"
                    stroke="hsl(var(--learning))"
                    fill="hsl(var(--learning))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Subject Performance & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart className="w-5 h-5 text-success" />
                <span>Subject Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.performance.subjects.map((subject, index) => (
                  <motion.div
                    key={subject.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-learning rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{subject.score}</span>
                      </div>
                      <div>
                        <p className="font-medium">{subject.name}</p>
                        <div className="flex items-center space-x-1">
                          {subject.improvement > 0 ? (
                            <TrendingUp className="w-3 h-3 text-success" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-destructive" />
                          )}
                          <span className={`text-xs ${
                            subject.improvement > 0 ? "text-success" : "text-destructive"
                          }`}>
                            {subject.improvement > 0 ? "+" : ""}{subject.improvement}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-learning rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.score}%` }}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-warning" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      achievement.earned 
                        ? "border-success/20 bg-success/5" 
                        : "border-muted/20 bg-muted/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          achievement.earned 
                            ? "bg-gradient-success" 
                            : "bg-muted"
                        }`}>
                          <Award className={`w-4 h-4 ${
                            achievement.earned ? "text-white" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div>
                          <p className={`font-medium ${
                            achievement.earned ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {achievement.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {achievement.earned ? (
                          <Badge className="bg-success text-success-foreground">
                            Earned
                          </Badge>
                        ) : (
                          <div className="text-xs text-muted-foreground">
                            {achievement.progress}%
                          </div>
                        )}
                      </div>
                    </div>
                    {!achievement.earned && (
                      <div className="mt-2 w-full h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-learning rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${achievement.progress}%` }}
                          transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
});
