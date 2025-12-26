import { useRef, useState, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -20;
    const rotateY = (x - 0.5) * 20;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
    setGlare({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      <div
        className="tilt-card-glare"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
};
