import { useInView } from "@/hooks";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const SplitText = ({ text, className = "", delay = 0 }: SplitTextProps) => {
  const [ref, inView] = useInView(0.3);
  const words = text.split(" ");

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={`split-text ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="word-wrapper">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className={`split-char ${inView ? "animate" : ""}`}
              style={{
                animationDelay: `${delay + wordIndex * 0.1 + charIndex * 0.03}s`,
              }}
            >
              {char}
            </span>
          ))}
          <span>&nbsp;</span>
        </span>
      ))}
    </span>
  );
};
