import { useEffect, useState } from "react";

export const LoadingText = ({ text = "Loading" }) => {
  const [dotCount, setDotCount] = useState(["."]);
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      if (dotCount.length < 3) {
        setDotCount([...dotCount, "."]);
      } else {
        setDotCount(["."]);
      }
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [dotCount]);

  return (
    <>
      {text}
      {dotCount.map((dot, index) => (
        <span key={dot + index}>{dot}</span>
      ))}
    </>
  );
};
