import type { MutableRefObject } from "react";
import { useEffect, useRef } from "react";
type THandlers = {
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp: (event: KeyboardEvent) => void;
};
type TConfig = {
  handlers: THandlers;
  isActive: boolean;
};
export const useKey = ({
  handlers,
  isActive,
}: TConfig): MutableRefObject<THandlers> => {
  const handlersRef = useRef(handlers);
  const removeListeners = () => {
    window.removeEventListener(
      "keydown",
      handlersRef.current.onKeyDown
    );
    window.removeEventListener(
      "keyup",
      handlersRef.current.onKeyUp
    );
  };
  useEffect(() => {
    if (isActive) {
      window.addEventListener(
        "keydown",
        handlersRef.current.onKeyDown
      );
      window.addEventListener(
        "keyup",
        handlersRef.current.onKeyUp
      );
    } else {
      removeListeners();
    }

    return removeListeners;
  }, [isActive]);
  return handlersRef;
};
