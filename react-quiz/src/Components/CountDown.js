import { useEffect } from "react";

export default function CountDown({ min, sec, dispatch }) {
  useEffect(() => {
    const interval = setInterval(() => {
      min === 0 && clearInterval(interval);

      dispatch({ type: "setCountdown" });

      return () => {
        clearInterval(interval);
      };
    }, 1000);
  }, [min, sec, dispatch]);

  return <p>{`${min}:${sec}`}</p>;
}
