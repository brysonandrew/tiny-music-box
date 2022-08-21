import type { MutableRefObject } from "react";
import { useEffect, useRef } from "react";

type THandlers = {
  handleTrackDown: (event: PointerEvent) => void;
  handleTrackUp: (event: PointerEvent) => void;
};
type TConfig = {
  handlers: THandlers;
  isActive: boolean;
};
export const useTrack = ({
  handlers,
  isActive,
}: TConfig): MutableRefObject<THandlers> => {
  const handlersRef = useRef(handlers);
  const removeListeners = () => {
    window.removeEventListener(
      "pointerdown",
      handlersRef.current.handleTrackDown
    );
    window.removeEventListener(
      "pointerup",
      handlersRef.current.handleTrackUp
    );
  };
  useEffect(() => {
    if (isActive) {
      window.addEventListener(
        "pointerdown",
        handlersRef.current.handleTrackDown
      );
      window.addEventListener(
        "pointerup",
        handlersRef.current.handleTrackUp
      );
    } else {
      removeListeners();
    }

    return removeListeners;
  }, [isActive]);
  return handlersRef;
};
