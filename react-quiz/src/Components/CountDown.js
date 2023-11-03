import { useEffect } from "react";

export default function CountDown({ min, sec, dispatch }) {
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "setCountdown" });
    }, 1000);
  }, [min, sec, dispatch]);

  return <p>{`${min}:${sec}`}</p>;
}
