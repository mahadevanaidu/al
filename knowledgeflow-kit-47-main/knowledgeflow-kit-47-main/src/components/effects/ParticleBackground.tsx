import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  direction: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  colors?: string[];
  speed?: number;
  size?: { min: number; max: number };
  interactive?: boolean;
}

export const ParticleBackground = memo(({ 
  particleCount = 50, 
  colors = ["hsl(var(--primary))", "hsl(var(--learning))", "hsl(var(--success))"],
  speed = 0.5,
  size = { min: 1, max: 4 },
  interactive = true
}: ParticleBackgroundProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const createParticle = (id: number): Particle => ({
    id,
    x: Math.random() * (containerRef.current?.clientWidth || window.innerWidth),
    y: Math.random() * (containerRef.current?.clientHeight || window.innerHeight),
    size: Math.random() * (size.max - size.min) + size.min,
    speed: Math.random() * speed + 0.1,
    opacity: Math.random() * 0.8 + 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    direction: Math.random() * Math.PI * 2
  });

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => createParticle(i));
    setParticles(newParticles);
  }, [particleCount, colors, size]);

  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev.map(particle => {
        const newX = particle.x + Math.cos(particle.direction) * particle.speed;
        const newY = particle.y + Math.sin(particle.direction) * particle.speed;
        
        const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
        const containerHeight = containerRef.current?.clientHeight || window.innerHeight;

        return {
          ...particle,
          x: newX > containerWidth ? 0 : newX < 0 ? containerWidth : newX,
          y: newY > containerHeight ? 0 : newY < 0 ? containerHeight : newY,
          direction: particle.direction + (Math.random() - 0.5) * 0.1
        };
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [interactive, mouseX, mouseY]);

  const getParticleDistance = (particle: Particle) => {
    if (!interactive) return 0;
    const dx = particle.x - mousePosition.x;
    const dy = particle.y - mousePosition.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      {particles.map((particle) => {
        const distance = getParticleDistance(particle);
        const isNearMouse = distance < 100;
        const scale = isNearMouse ? 1.5 : 1;
        const opacity = isNearMouse ? particle.opacity * 1.5 : particle.opacity;

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: Math.min(opacity, 1)
            }}
            animate={{
              scale: [1, scale, 1],
              opacity: [particle.opacity, opacity, particle.opacity]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={interactive ? { scale: 2 } : {}}
          />
        );
      })}

      {/* Connection lines */}
      {interactive && (
        <svg className="absolute inset-0 w-full h-full">
          {particles.map((particle, i) => {
            const distance = getParticleDistance(particle);
            if (distance > 100) return null;

            return particles.slice(i + 1).map((otherParticle) => {
              const otherDistance = getParticleDistance(otherParticle);
              const particleDistance = Math.sqrt(
                Math.pow(particle.x - otherParticle.x, 2) + 
                Math.pow(particle.y - otherParticle.y, 2)
              );

              if (particleDistance < 150) {
                return (
                  <motion.line
                    key={`${particle.id}-${otherParticle.id}`}
                    x1={particle.x}
                    y1={particle.y}
                    x2={otherParticle.x}
                    y2={otherParticle.y}
                    stroke="hsl(var(--primary))"
                    strokeWidth={0.5}
                    opacity={0.3}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />
                );
              }
              return null;
            });
          })}
        </svg>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5" />
    </div>
  );
});
