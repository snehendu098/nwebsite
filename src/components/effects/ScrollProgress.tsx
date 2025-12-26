import { useState, useEffect } from "react";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / height) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-progress">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};
