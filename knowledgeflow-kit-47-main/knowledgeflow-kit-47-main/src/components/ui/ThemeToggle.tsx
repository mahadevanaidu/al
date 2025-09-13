import { motion } from "framer-motion";
import { memo, useState } from "react";
import { Sun, Moon, Monitor, Palette } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

type Theme = "light" | "dark" | "system";

interface ThemeToggleProps {
  currentTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
}

export const ThemeToggle = memo(({ currentTheme = "dark", onThemeChange }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    onThemeChange?.(newTheme);
    
    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(newTheme);
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-4 h-4" />;
      case "dark":
        return <Moon className="w-4 h-4" />;
      case "system":
        return <Monitor className="w-4 h-4" />;
      default:
        return <Palette className="w-4 h-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System";
      default:
        return "Theme";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="sm"
            className="relative overflow-hidden hover:shadow-learning transition-all duration-300"
          >
            <motion.div
              className="flex items-center space-x-2"
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
              {getThemeIcon()}
              <span className="hidden sm:inline">{getThemeLabel()}</span>
            </motion.div>
            
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-learning opacity-0"
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-card/95 backdrop-blur-sm border-primary/20 shadow-elevated"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DropdownMenuItem
            onClick={() => handleThemeChange("light")}
            className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 transition-colors"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4 text-warning" />
            </motion.div>
            <span>Light</span>
            {theme === "light" && (
              <motion.div
                className="ml-auto w-2 h-2 bg-primary rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => handleThemeChange("dark")}
            className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 transition-colors"
          >
            <motion.div
              whileHover={{ rotate: -15, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-4 h-4 text-primary" />
            </motion.div>
            <span>Dark</span>
            {theme === "dark" && (
              <motion.div
                className="ml-auto w-2 h-2 bg-primary rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => handleThemeChange("system")}
            className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 transition-colors"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Monitor className="w-4 h-4 text-muted-foreground" />
            </motion.div>
            <span>System</span>
            {theme === "system" && (
              <motion.div
                className="ml-auto w-2 h-2 bg-primary rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
