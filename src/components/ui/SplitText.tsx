interface SplitTextProps {
  text: string;
  className?: string;
}

export const SplitText = ({ text, className = "" }: SplitTextProps) => {
  const words = text.split(" ");

  return (
    <span className={`split-text ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="word-wrapper">
          {word.split("").map((char, charIndex) => (
            <span key={charIndex} className="split-char">
              {char}
            </span>
          ))}
          <span>&nbsp;</span>
        </span>
      ))}
    </span>
  );
};
