import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import { Loader2, MessageCircle, Settings, Activity } from "lucide-react";
import { AIChat } from "@/components/ai/AIChat";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { AccessibilityTools } from "@/components/ui/AccessibilityTools";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PerformanceMonitor } from "@/components/performance/PerformanceMonitor";
import { Button } from "@/components/ui/button";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Optimized QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

function App() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark relative min-h-screen"> {/* Force dark mode */}
          {/* Particle Background */}
          <ParticleBackground 
            particleCount={30}
            interactive={true}
            speed={0.3}
          />
          
          {/* Global UI Elements */}
          <Toaster />
          <Sonner />
          
          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <div id="main-content">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </Suspense>
          </BrowserRouter>

          {/* Floating Action Buttons */}
          <div className="fixed bottom-4 right-4 z-40 flex flex-col space-y-3">
            {/* AI Chat Toggle */}
            <Button
              onClick={() => setIsAIChatOpen(!isAIChatOpen)}
              className="w-14 h-14 rounded-full shadow-elevated hover:shadow-neon transition-all duration-300 bg-gradient-learning hover:scale-110"
              aria-label="Open AI Chat"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </Button>

            {/* Settings Toggle */}
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="outline"
              className="w-12 h-12 rounded-full shadow-elevated hover:shadow-neon transition-all duration-300"
              aria-label="Open Settings"
            >
              <Settings className="w-5 h-5" />
            </Button>

            {/* Performance Monitor Toggle */}
            <Button
              onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
              variant="outline"
              className="w-12 h-12 rounded-full shadow-elevated hover:shadow-neon transition-all duration-300"
              aria-label="Toggle Performance Monitor"
            >
              <Activity className="w-5 h-5" />
            </Button>
          </div>

          {/* AI Chat Component */}
          <AIChat 
            isOpen={isAIChatOpen}
            onToggle={() => setIsAIChatOpen(!isAIChatOpen)}
          />

          {/* Accessibility Tools */}
          <AccessibilityTools />

          {/* Performance Monitor */}
          <PerformanceMonitor
            isVisible={showPerformanceMonitor}
            onToggle={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
          />

          {/* Theme Toggle (if settings panel is open) */}
          {showSettings && (
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;