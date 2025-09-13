import { motion } from "framer-motion";
import { memo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  TrendingUp, 
  Users, 
  Zap,
  Target,
  Flame,
  Award
} from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  level: number;
  streak: number;
  badges: number;
  rank: number;
  isCurrentUser?: boolean;
  change: "up" | "down" | "same";
  changeValue: number;
}

interface LeaderboardProps {
  timeRange: "daily" | "weekly" | "monthly" | "all";
  category: "overall" | "streak" | "badges" | "points";
}

export const Leaderboard = memo(({ timeRange, category }: LeaderboardProps) => {
  const [selectedCategory, setSelectedCategory] = useState(category);

  const mockData: LeaderboardEntry[] = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "",
      score: 2847,
      level: 15,
      streak: 23,
      badges: 12,
      rank: 1,
      isCurrentUser: true,
      change: "up",
      changeValue: 3
    },
    {
      id: "2",
      name: "Sarah Chen",
      avatar: "",
      score: 2756,
      level: 14,
      streak: 18,
      badges: 11,
      rank: 2,
      change: "down",
      changeValue: 1
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      avatar: "",
      score: 2634,
      level: 13,
      streak: 15,
      badges: 9,
      rank: 3,
      change: "up",
      changeValue: 2
    },
    {
      id: "4",
      name: "Emma Wilson",
      avatar: "",
      score: 2512,
      level: 13,
      streak: 12,
      badges: 8,
      rank: 4,
      change: "same",
      changeValue: 0
    },
    {
      id: "5",
      name: "David Kim",
      avatar: "",
      score: 2389,
      level: 12,
      streak: 9,
      badges: 7,
      rank: 5,
      change: "up",
      changeValue: 1
    },
    {
      id: "6",
      name: "Lisa Brown",
      avatar: "",
      score: 2256,
      level: 12,
      streak: 7,
      badges: 6,
      rank: 6,
      change: "down",
      changeValue: 2
    },
    {
      id: "7",
      name: "James Taylor",
      avatar: "",
      score: 2134,
      level: 11,
      streak: 5,
      badges: 5,
      rank: 7,
      change: "up",
      changeValue: 1
    },
    {
      id: "8",
      name: "Anna Davis",
      avatar: "",
      score: 2012,
      level: 11,
      streak: 4,
      badges: 4,
      rank: 8,
      change: "same",
      changeValue: 0
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getScoreValue = (entry: LeaderboardEntry) => {
    switch (selectedCategory) {
      case "overall":
        return entry.score;
      case "streak":
        return entry.streak;
      case "badges":
        return entry.badges;
      case "points":
        return entry.score;
      default:
        return entry.score;
    }
  };

  const getScoreLabel = () => {
    switch (selectedCategory) {
      case "overall":
        return "Score";
      case "streak":
        return "Streak";
      case "badges":
        return "Badges";
      case "points":
        return "Points";
      default:
        return "Score";
    }
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-success" />;
      case "down":
        return <TrendingUp className="w-3 h-3 text-destructive rotate-180" />;
      default:
        return <div className="w-3 h-3" />;
    }
  };

  const getChangeColor = (change: string) => {
    switch (change) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="shadow-card hover:shadow-elevated transition-all duration-300 bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-warning" />
            <span>Leaderboard</span>
            <Badge variant="outline" className="capitalize">
              {timeRange}
            </Badge>
          </CardTitle>
          <div className="flex space-x-1">
            {(["overall", "streak", "badges", "points"] as const).map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="capitalize text-xs"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockData.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                entry.isCurrentUser
                  ? "bg-gradient-to-r from-primary/10 to-learning/10 border border-primary/30 shadow-learning"
                  : "bg-muted/30 hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(entry.rank)}
                </div>
                
                <Avatar className="w-10 h-10">
                  <AvatarImage src={entry.avatar} alt={entry.name} />
                  <AvatarFallback className="bg-gradient-learning text-white font-bold">
                    {entry.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className={`font-medium ${
                      entry.isCurrentUser ? "text-foreground" : "text-foreground"
                    }`}>
                      {entry.name}
                    </p>
                    {entry.isCurrentUser && (
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        You
                      </Badge>
                    )}
                    <div className="flex items-center space-x-1">
                      {getChangeIcon(entry.change)}
                      <span className={`text-xs ${getChangeColor(entry.change)}`}>
                        {entry.changeValue > 0 ? "+" : ""}{entry.changeValue}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Level {entry.level}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Flame className="w-3 h-3" />
                      <span>{entry.streak} days</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span>{entry.badges} badges</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-foreground">
                    {getScoreValue(entry).toLocaleString()}
                  </div>
                  {entry.rank <= 3 && (
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
                      {getRankIcon(entry.rank)}
                    </motion.div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{getScoreLabel()}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Your Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-learning/5 rounded-xl border border-primary/20"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground">Your Progress</h4>
            <Badge className="bg-gradient-learning text-white">
              Rank #{mockData.find(e => e.isCurrentUser)?.rank}
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {mockData.find(e => e.isCurrentUser)?.score}
              </div>
              <p className="text-xs text-muted-foreground">Total Score</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {mockData.find(e => e.isCurrentUser)?.streak}
              </div>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {mockData.find(e => e.isCurrentUser)?.badges}
              </div>
              <p className="text-xs text-muted-foreground">Badges</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Next Level Progress</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-learning rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, delay: 1 }}
              />
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
});
