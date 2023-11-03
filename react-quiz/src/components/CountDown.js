import { useEffect, useState } from "react";

export function CountDown({ dispatch, min, sec }) {
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "setCountDown" });
      if (min === 0) clearInterval(interval);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [min, sec, dispatch]);

  return (
    <p className="countdown">
      {(min < 10 && `0${min}`) || min} : {(sec < 10 && `0${sec}`) || sec}
    </p>
  );
}
