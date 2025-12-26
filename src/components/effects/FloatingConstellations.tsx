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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const constellation = CONSTELLATIONS[name];
  if (!constellation) return null;

  const translateY = scrollY * 0.05;
  const translateX = scrollY * 0.02;
  const rotation = scrollY * 0.01;

  return (
    <div className="floating-constellations">
      <div
        className="floating-constellation"
        style={{
          left: "50%",
          top: "30%",
          opacity,
          transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`,
        }}
      >
        <Constellation
          stars={constellation.stars}
          connections={constellation.connections}
          width={250}
          height={250}
          animated
        />
      </div>
    </div>
  );
};
