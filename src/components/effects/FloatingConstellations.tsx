import { useEffect, useState } from "react";
import { Constellation, CONSTELLATIONS } from "./Constellation";

type ConstellationName = keyof typeof CONSTELLATIONS;

interface FloatingConstellationProps {
  name: ConstellationName;
  opacity?: number;
}

export const FloatingConstellation = ({
  name,
  opacity = 0.5,
}: FloatingConstellationProps) => {
  const [progress, setProgress] = useState(0);
  const [rotationConfig] = useState(() => ({
    multiplier: 1 + Math.random() * 2, // 1-3 full rotations
    direction: Math.random() > 0.5 ? 1 : -1, // clockwise or counter-clockwise
  }));

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(Math.min(1, Math.max(0, scrollProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const constellation = CONSTELLATIONS[name];
  if (!constellation) return null;

  const size = 250;

  // Start: top-left (160px from top, 80px from left)
  // End: bottom-right with 0px gap
  const xPos = `calc(80px + (100vw - ${size}px - 80px) * ${progress})`;
  const yPos = `calc(160px + (100vh - ${size}px - 160px) * ${progress})`;
  const rotation = progress * 360 * rotationConfig.multiplier * rotationConfig.direction;

  return (
    <div className="floating-constellations">
      <div
        className="floating-constellation"
        style={{
          left: xPos,
          top: yPos,
          opacity,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <Constellation
          stars={constellation.stars}
          connections={constellation.connections}
          width={size}
          height={size}
          animated
        />
      </div>
    </div>
  );
};
