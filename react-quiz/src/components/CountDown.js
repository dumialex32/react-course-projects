import { useEffect } from "react";

export function Countdown({ dispatch, secondsRemaining }) {
  useEffect(() => {
    const timer = setInterval(() => {
      secondsRemaining === 0 && clearInterval(timer);
      dispatch({ type: "setCountdown" });
      console.log(secondsRemaining);
    }, 1000);

    return () => clearInterval(timer);
  });

  return <p className="btn countdown">{secondsRemaining}</p>;
}
