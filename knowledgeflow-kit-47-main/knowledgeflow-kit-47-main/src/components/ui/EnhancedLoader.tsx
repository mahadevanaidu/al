import { motion } from "framer-motion";
import { memo } from "react";
import { Loader2, Brain, Sparkles } from "lucide-react";

interface EnhancedLoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "brain" | "sparkles";
}

export const EnhancedLoader = memo(({ 
  message = "Loading...", 
  size = "md",
  variant = "default" 
}: EnhancedLoaderProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const renderIcon = () => {
    switch (variant) {
      case "brain":
        return (
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`${sizeClasses[size]} text-primary`}
          >
            <Brain className="w-full h-full" />
          </motion.div>
        );
      case "sparkles":
        return (
          <motion.div
            animate={{ 
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`${sizeClasses[size]} text-learning`}
          >
            <Sparkles className="w-full h-full" />
          </motion.div>
        );
      default:
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`${sizeClasses[size]} text-primary`}
          >
            <Loader2 className="w-full h-full" />
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex flex-col items-center justify-center space-y-4 p-8"
    >
      <motion.div
        className="relative"
        animate={{ 
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {renderIcon()}
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.p
          className={`font-medium text-foreground ${textSizeClasses[size]}`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {message}
        </motion.p>
        
        {/* Loading dots */}
        <div className="flex space-x-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
});
