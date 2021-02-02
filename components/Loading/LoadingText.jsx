import { useEffect, useState } from "react";

export const LoadingText = () => {
  const [dotCount, setDotCount] = useState(["."]);
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      if (dotCount.length < 3) {
        setDotCount([...dotCount, "."]);
      } else {
        setDotCount(["."]);
      }
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [dotCount]);

  return (
    <span>Loading 
      {dotCount.map((dot, index) => (
        <span key={dot + index}>{dot}</span>
      ))}
    </span>
  );
};
