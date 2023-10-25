import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(() => {
    function handleKeyEvent(e) {
      e.code.toLowerCase() === key.toLowerCase() && callback();
    }

    document.addEventListener("keydown", handleKeyEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    };
  }, [callback, key]);
}
