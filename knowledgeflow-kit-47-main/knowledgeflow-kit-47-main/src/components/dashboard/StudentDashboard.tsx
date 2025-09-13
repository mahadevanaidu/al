import { ProgressCard } from "./ProgressCard";
import { StudyRecommendations } from "./StudyRecommendations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BookOpen, Trophy, Clock, Target, Play, ArrowRight } from "lucide-react";

const progressData = [
  { subject: "Math", score: 85 },
  { subject: "Data Structures", score: 72 },
  { subject: "DBMS", score: 91 },
  { subject: "Algorithms", score: 68 },
];

const difficultyData = [
  { name: "Easy", value: 45, color: "hsl(var(--success))" },
  { name: "Medium", value: 35, color: "hsl(var(--warning))" },
  { name: "Hard", value: 20, color: "hsl(var(--destructive))" },
];

const recentAssessments = [
  { id: 1, title: "Binary Trees Quiz", subject: "Data Structures", score: 8, total: 10, status: "completed" },
  { id: 2, title: "SQL Joins Assessment", subject: "DBMS", score: 9, total: 10, status: "completed" },
  { id: 3, title: "Calculus Practice", subject: "Math", score: 0, total: 15, status: "pending" },
];

export const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-hero rounded-2xl p-8 text-white shadow-neon relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full animate-float"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-3xl font-bold mb-3">Good morning, Alex! 👋</h1>
            <p className="text-white/90 text-lg mb-6">Ready to continue your learning journey with DOB4DIE?</p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">3 badges earned this week</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">85% weekly goal</span>
              </div>
            </div>
          </div>
          <Button variant="secondary" size="lg" className="shadow-elevated hover:shadow-neon group">
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Quick Practice
          </Button>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProgressCard
          title="Overall Score"
          value={82}
          change={5}
          changeType="increase"
          description="Up from last week"
        />
        <ProgressCard
          title="Streak Days"
          value={12}
          maxValue={30}
          unit=" days"
          change={2}
          changeType="increase"
          description="Keep going!"
        />
        <ProgressCard
          title="Time Studied"
          value={45}
          maxValue={60}
          unit=" min"
          change={-10}
          changeType="decrease"
          description="Today's session"
        />
        <ProgressCard
          title="Assessments"
          value={23}
          maxValue={30}
          unit=""
          change={3}
          changeType="increase"
          description="This month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subject Progress */}
          <Card className="shadow-neon bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="w-8 h-8 bg-gradient-learning rounded-lg flex items-center justify-center">
                  <BarChart className="w-5 h-5 text-white" />
                </div>
                <span>Subject Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                  <XAxis 
                    dataKey="subject" 
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                  />
                  <Bar 
                    dataKey="score" 
                    fill="url(#gradientBar)" 
                    radius={[6, 6, 0, 0]}
                    className="hover:opacity-80 transition-opacity"
                  />
                  <defs>
                    <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--learning))" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Assessments */}
          <Card className="shadow-neon bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-learning rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span>Recent Assessments</span>
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAssessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between p-4 border border-primary/20 rounded-xl bg-gradient-to-r from-card/50 to-card/30 hover:shadow-learning transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-learning rounded-xl flex items-center justify-center shadow-card">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base text-foreground">{assessment.title}</h4>
                        <p className="text-sm text-muted-foreground">{assessment.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {assessment.status === "completed" ? (
                        <div className="text-right">
                          <p className="font-bold text-base text-success">{assessment.score}/{assessment.total}</p>
                          <p className="text-sm text-muted-foreground">
                            {Math.round((assessment.score / assessment.total) * 100)}%
                          </p>
                        </div>
                      ) : (
                        <Badge variant="outline" className="bg-warning/20 border-warning/50 text-warning font-medium">
                          Pending
                        </Badge>
                      )}
                      <Button 
                        size="sm" 
                        variant={assessment.status === "completed" ? "outline" : "default"}
                        className={assessment.status === "completed" 
                          ? "border-primary/50 hover:border-primary hover:bg-primary/10" 
                          : "shadow-learning hover:shadow-neon"
                        }
                      >
                        {assessment.status === "completed" ? "Review" : "Start"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Study Recommendations */}
          <StudyRecommendations />

          {/* Performance Breakdown */}
          <Card className="shadow-neon bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-learning rounded-md flex items-center justify-center">
                  <BarChart className="w-4 h-4 text-white" />
                </div>
                <span>Question Difficulty</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {difficultyData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};