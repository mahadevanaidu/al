import { motion, AnimatePresence } from "framer-motion";
import { memo, useState, useEffect } from "react";
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Type, 
  MousePointer,
  Settings,
  Accessibility
} from "lucide-react";
import { Button } from "./button";
import { Slider } from "./slider";

interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  soundEnabled: boolean;
  focusVisible: boolean;
  fontSize: number;
}

interface AccessibilityToolsProps {
  onSettingsChange?: (settings: AccessibilitySettings) => void;
}

export const AccessibilityTools = memo(({ onSettingsChange }: AccessibilityToolsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    soundEnabled: true,
    focusVisible: true,
    fontSize: 16
  });

  useEffect(() => {
    // Apply settings to document
    const root = document.documentElement;
    
    if (settings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    
    if (settings.reducedMotion) {
      root.classList.add("reduced-motion");
    } else {
      root.classList.remove("reduced-motion");
    }
    
    if (settings.largeText) {
      root.classList.add("large-text");
    } else {
      root.classList.remove("large-text");
    }
    
    root.style.fontSize = `${settings.fontSize}px`;
    
    onSettingsChange?.(settings);
  }, [settings, onSettingsChange]);

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const updateFontSize = (value: number[]) => {
    setSettings(prev => ({
      ...prev,
      fontSize: value[0]
    }));
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="relative"
      >
        {/* Main Toggle Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 rounded-full shadow-elevated hover:shadow-neon transition-all duration-300 bg-primary hover:bg-primary/90"
            aria-label="Accessibility Settings"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Accessibility className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          </Button>
        </motion.div>

        {/* Settings Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-16 left-0 w-80 bg-card/95 backdrop-blur-sm border border-primary/20 rounded-xl shadow-elevated p-6"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Accessibility Settings</h3>
                </div>

                {/* High Contrast Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">High Contrast</span>
                  </div>
                  <Button
                    size="sm"
                    variant={settings.highContrast ? "default" : "outline"}
                    onClick={() => toggleSetting("highContrast")}
                    className="transition-all duration-300"
                  >
                    {settings.highContrast ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Reduced Motion Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MousePointer className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Reduce Motion</span>
                  </div>
                  <Button
                    size="sm"
                    variant={settings.reducedMotion ? "default" : "outline"}
                    onClick={() => toggleSetting("reducedMotion")}
                    className="transition-all duration-300"
                  >
                    {settings.reducedMotion ? "On" : "Off"}
                  </Button>
                </div>

                {/* Large Text Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Type className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Large Text</span>
                  </div>
                  <Button
                    size="sm"
                    variant={settings.largeText ? "default" : "outline"}
                    onClick={() => toggleSetting("largeText")}
                    className="transition-all duration-300"
                  >
                    {settings.largeText ? "On" : "Off"}
                  </Button>
                </div>

                {/* Sound Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {settings.soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">Sound Effects</span>
                  </div>
                  <Button
                    size="sm"
                    variant={settings.soundEnabled ? "default" : "outline"}
                    onClick={() => toggleSetting("soundEnabled")}
                    className="transition-all duration-300"
                  >
                    {settings.soundEnabled ? "On" : "Off"}
                  </Button>
                </div>

                {/* Font Size Slider */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Type className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Font Size: {settings.fontSize}px</span>
                  </div>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={updateFontSize}
                    min={12}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Focus Visible Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MousePointer className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Enhanced Focus</span>
                  </div>
                  <Button
                    size="sm"
                    variant={settings.focusVisible ? "default" : "outline"}
                    onClick={() => toggleSetting("focusVisible")}
                    className="transition-all duration-300"
                  >
                    {settings.focusVisible ? "On" : "Off"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
});
