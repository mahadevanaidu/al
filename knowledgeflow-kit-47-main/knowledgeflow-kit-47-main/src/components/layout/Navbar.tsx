import { useState, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GraduationCap, BarChart, Settings, LogOut, Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  userRole?: "student" | "teacher" | "admin";
  userName?: string;
}

export const Navbar = memo(({ userRole = "student", userName = "John Doe" }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart },
    { name: "Learn", href: "/learn", icon: GraduationCap },
    ...(userRole === "teacher" ? [{ name: "Manage", href: "/manage", icon: Settings }] : []),
    ...(userRole === "admin" ? [{ name: "Admin", href: "/admin", icon: Settings }] : []),
  ];

  return (
    <motion.nav 
      className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.img 
                src="/src/assets/dob4die-logo.png" 
                alt="DOB4DIE Logo" 
                className="w-10 h-10 animate-glow group-hover:animate-pulse"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <span className="font-bold text-2xl text-foreground bg-gradient-learning bg-clip-text text-transparent group-hover:animate-gradient">
                DOB4DIE
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                      isActive
                        ? "bg-accent text-accent-foreground shadow-learning"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:shadow-card"
                    }`}
                  >
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                    {isActive && (
                      <motion.div
                        className="w-1 h-1 bg-primary rounded-full"
                        layoutId="activeIndicator"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={userName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {userName.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">{userRole}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden py-4 border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-accent text-accent-foreground shadow-learning"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        {isActive && (
                          <motion.div
                            className="w-1 h-1 bg-primary rounded-full ml-auto"
                            layoutId="mobileActiveIndicator"
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
});