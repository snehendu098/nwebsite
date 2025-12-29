import { ReactNode } from "react";
import { useParallax } from "@/hooks";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxLayer = ({
  children,
  speed = 0.5,
  className = "",
}: ParallaxLayerProps) => {
  const [ref, offset] = useParallax(speed);

  return (
    <div
      ref={ref}
      className={`parallax-layer ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
};
