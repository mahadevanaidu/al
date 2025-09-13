import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Brain, BarChart, Users, BookOpen, Trophy, ArrowRight, CheckCircle, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import dob4dieLogo from "@/assets/dob4die-logo.png";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={dob4dieLogo} 
                alt="DOB4DIE Logo" 
                className="w-10 h-10 animate-glow"
              />
              <span className="font-bold text-2xl bg-gradient-learning bg-clip-text text-transparent">
                DOB4DIE
              </span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button className="shadow-neon">Get Started</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-neon opacity-20"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                className="relative"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src={dob4dieLogo} 
                  alt="DOB4DIE" 
                  className="w-20 h-20 mb-6 animate-glow"
                />
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              <span className="bg-gradient-hero bg-clip-text text-transparent animate-gradient">
                Adaptive Learning.
              </span>
              <br />
              <span className="text-foreground">Personalized for You.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Experience the future of education with AI-powered adaptive learning. Get personalized assessments, 
              real-time progress analytics, and intelligent study recommendations that evolve with your journey.
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/auth">
                <Button size="lg" className="shadow-neon hover:shadow-learning transition-all duration-300 group">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="border-primary/50 hover:border-primary hover:shadow-learning">
                  <Zap className="w-4 h-4 mr-2" />
                  View Demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose <span className="bg-gradient-learning bg-clip-text text-transparent">DOB4DIE</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of personalized learning with cutting-edge AI technology
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Assessments",
                description: "Get personalized quizzes and assignments generated based on your learning profile and performance history.",
                gradient: "bg-gradient-learning"
              },
              {
                icon: BarChart,
                title: "Real-time Analytics",
                description: "Track your progress with detailed analytics, identify weak areas, and monitor your improvement over time.",
                gradient: "bg-gradient-success"
              },
              {
                icon: BookOpen,
                title: "Smart Recommendations",
                description: "Receive AI-driven study suggestions, topic recommendations, and difficulty adjustments tailored to your needs.",
                gradient: "bg-gradient-hero"
              },
              {
                icon: Users,
                title: "Multi-role Support",
                description: "Whether you're a student, teacher, or admin, our platform adapts to your specific role and requirements.",
                gradient: "bg-gradient-learning"
              },
              {
                icon: Trophy,
                title: "Achievement System",
                description: "Stay motivated with badges, streaks, and achievements that celebrate your learning milestones.",
                gradient: "bg-gradient-success"
              },
              {
                icon: GraduationCap,
                title: "Adaptive Learning",
                description: "Experience education that evolves with you, adjusting content difficulty and pacing to match your learning style.",
                gradient: "bg-gradient-hero"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="shadow-card hover:shadow-neon transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20 hover-lift neon-border group">
                  <CardHeader>
                    <div className={`w-14 h-14 ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-learning`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="bg-gradient-hero rounded-3xl p-12 text-white shadow-neon relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-float"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Join the future of education with DOB4DIE's AI-powered adaptive learning platform
              </p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/auth">
                  <Button size="lg" variant="secondary" className="shadow-elevated hover:shadow-neon group">
                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    Start Learning
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="flex items-center space-x-3 mb-6 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src={dob4dieLogo} 
                alt="DOB4DIE Logo" 
                className="w-10 h-10 animate-glow"
              />
              <span className="font-bold text-2xl bg-gradient-learning bg-clip-text text-transparent">
                DOB4DIE
              </span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <a href="#" className="hover:text-primary transition-colors">API Documentation</a>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-8 pt-8 border-t border-border/50 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground">
              &copy; 2024 DOB4DIE. Adaptive Learning. Personalized for You.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}