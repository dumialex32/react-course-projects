import { useEffect } from "react";

export function Countdown({ dispatch, secondsRemaining }) {
  console.log(secondsRemaining);
  const seconds = secondsRemaining % 60;
  const minutes = Math.ceil(secondsRemaining / 60);
  useEffect(() => {
    const timer = setInterval(() => {
      // secondsRemaining === 0 && clearInterval(timer);
      dispatch({ type: "setCountdown" });
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <p className="btn countdown">{`${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`}</p>
  );
}
