import { useEffect, useState, useRef } from "react";
import { Constellation, CONSTELLATIONS } from "./Constellation";

type ConstellationName = keyof typeof CONSTELLATIONS;

interface FloatingConstellationProps {
  name: ConstellationName;
  opacity?: number;
  speed?: number;
}

export const FloatingConstellation = ({
  name,
  opacity = 0.5,
  speed = 3,
}: FloatingConstellationProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.8 * speed, y: 0.5 * speed });
  const positionRef = useRef({ x: 100, y: 100 });
  const rafRef = useRef<number>();
  const sizeRef = useRef(250);

  useEffect(() => {
    // Initialize position randomly
    positionRef.current = {
      x: Math.random() * (window.innerWidth - sizeRef.current),
      y: Math.random() * (window.innerHeight - sizeRef.current),
    };

    // Random initial direction
    const angle = Math.random() * Math.PI * 2;
    velocityRef.current = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };

    const animate = () => {
      const pos = positionRef.current;
      const vel = velocityRef.current;
      const size = sizeRef.current;

      // Update position
      pos.x += vel.x;
      pos.y += vel.y;

      // Bounce off edges
      if (pos.x <= 0) {
        pos.x = 0;
        vel.x = Math.abs(vel.x);
      } else if (pos.x >= window.innerWidth - size) {
        pos.x = window.innerWidth - size;
        vel.x = -Math.abs(vel.x);
      }

      if (pos.y <= 0) {
        pos.y = 0;
        vel.y = Math.abs(vel.y);
      } else if (pos.y >= window.innerHeight - size) {
        pos.y = window.innerHeight - size;
        vel.y = -Math.abs(vel.y);
      }

      setPosition({ x: pos.x, y: pos.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      // Keep in bounds on resize
      positionRef.current.x = Math.min(positionRef.current.x, window.innerWidth - sizeRef.current);
      positionRef.current.y = Math.min(positionRef.current.y, window.innerHeight - sizeRef.current);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [speed]);

  const constellation = CONSTELLATIONS[name];
  if (!constellation) return null;

  return (
    <div className="floating-constellations">
      <div
        className="floating-constellation"
        style={{
          left: position.x,
          top: position.y,
          opacity,
        }}
      >
        <Constellation
          stars={constellation.stars}
          connections={constellation.connections}
          width={sizeRef.current}
          height={sizeRef.current}
          animated
        />
      </div>
    </div>
  );
};
