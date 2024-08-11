import { useState, useEffect, useCallback } from "react";

const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  const downHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === targetKey) setKeyPressed(true);
  }, [targetKey]);

  const upHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === targetKey) setKeyPressed(false);
  }, [targetKey]);

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    // Clean up function to remove event listeners
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
};

export default useKeyPress;
