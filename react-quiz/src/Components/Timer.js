import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
  const sec = secondsRemaining % 60;
  const min = Math.floor(secondsRemaining / 60);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <p className="timer">
      {min}:{sec < 10 ? "0" + sec : sec}
    </p>
  );
}
