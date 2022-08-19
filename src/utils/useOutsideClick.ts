import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  EffectCallback,
  MutableRefObject,
  RefObject,
} from "react";

/**
  useInterval source 
  @see https://gist.github.com/Danziger/336e75b6675223ad805a88c2dfdcfd4a#file-throttled-callback-hook-ts
**/
/**
 * Use setInterval with Hooks in a declarative way.
 *
 * @see https://stackoverflow.com/a/59274004/3723993
 * @see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export function useInterval(
  callback: EffectCallback,
  delay: number | null
): MutableRefObject<number | null> {
  const intervalRef = useRef<
    number | null
  >(null);
  const callbackRef = useRef(callback);

  // Remember the latest callback:
  //
  // Without this, if you change the callback, when setInterval ticks again, it
  // will still call your old callback.
  //
  // If you add `callback` to useEffect's deps, it will work fine but the
  // interval will be reset.

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the interval:

  useEffect(() => {
    if (typeof delay === "number") {
      intervalRef.current =
        window.setInterval(
          () => callbackRef.current(),
          delay
        );

      // Clear interval if the components is unmounted or the delay changes:
      return () =>
        window.clearInterval(
          intervalRef.current || 0
        );
    }
  }, [delay]);

  // In case you want to manually clear the interval from the consuming component...:
  return intervalRef;
}

/*
  useTimeout is taken and modified from:
  https://usehooks-ts.com/react-hook/use-timeout
*/
type TTimeoutRef =
  MutableRefObject<ReturnType<
    typeof setTimeout
  > | null>;
export const useTimeout = (
  callback: () => void,
  delay: number | null
): TTimeoutRef => {
  const savedCallback =
    useRef(callback);
  const timeout: TTimeoutRef =
    useRef(null);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (typeof delay !== "number") {
      return;
    }

    timeout.current = setTimeout(
      () => savedCallback.current(),
      delay
    );

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [delay]);
  return timeout;
};

/*
  useDelayedCallback is taken and modified from the hook useTimeout from:
  https://usehooks-ts.com/react-hook/use-timeout
*/
export const useDelayedCallback = (
  callback: (...args: any) => void,
  delay: number | null
) => {
  const timeoutRef: MutableRefObject<ReturnType<
    typeof setTimeout
  > | null> = useRef(null);

  useEffect(() => {
    const timeoutId =
      timeoutRef.current;
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return () => {
    if (typeof delay !== "number") {
      return;
    }
    timeoutRef.current = setTimeout(
      callback,
      delay
    );
  };
};

export const msToTime = (
  duration: number
): number[] => {
  const milliseconds = Math.floor(
    (duration % 1000) / 100
  );
  let seconds = Math.floor(
      (duration / 1000) % 60
    ),
    minutes = Math.floor(
      (duration / (1000 * 60)) % 60
    ),
    hours = Math.floor(
      (duration / (1000 * 60 * 60)) % 24
    );

  hours =
    hours < 10 ? 0 + hours : hours;
  minutes =
    minutes < 10
      ? 0 + minutes
      : minutes;
  seconds =
    seconds < 10
      ? 0 + seconds
      : seconds;

  return [
    hours,
    minutes,
    seconds,
    milliseconds,
  ];
};

export const resolveHoursMinsSecondsHumanReadable =
  ([
    hours,
    minutes,
    seconds,
  ]: number[]) => {
    if (hours) {
      return `${hours} hours`;
    }
    if (minutes) {
      return `${minutes} minutes`;
    }
    return `${seconds} seconds`;
  };

export const resolveUpdateDuration = ([
  hours,
  minutes,
]: number[]) => {
  if (hours) {
    return 1000 * 60 * 60;
  }
  if (minutes) {
    return 1000 * 60;
  }
  return 1000;
};

export const timeNow = () =>
  new Date().getTime();

export const useHumanReadableTimePassed =
  (): [
    string,
    (timeOrigin: number) => void
  ] => {
    const [timeOrigin, setTimeOrigin] =
      useState(0);
    const [timePassed, setTimePassed] =
      useState(0);

    useEffect(() => {
      setTimePassed(
        timeNow() - timeOrigin
      );
    }, [timeOrigin]);

    const hoursMinsSeconds =
      useCallback(
        () => msToTime(timePassed),
        [timePassed]
      );

    const humanReadableTimePassed =
      resolveHoursMinsSecondsHumanReadable(
        hoursMinsSeconds()
      );
    const updateDuration =
      resolveUpdateDuration(
        hoursMinsSeconds()
      );

    useInterval(() => {
      setTimePassed(
        timeNow() - timeOrigin
      );
    }, updateDuration);

    return [
      humanReadableTimePassed,
      setTimeOrigin,
    ];
  };

export const useOutsideClick = <
  T extends HTMLElement
>(
  onClose: (event: MouseEvent) => void
): RefObject<T> => {
  const ref: RefObject<T> =
    useRef(null);
  useEffect(() => {
    const listener = (
      event: MouseEvent
    ) => {
      if (
        !ref.current ||
        ref.current.contains(
          event.target as Node
        )
      ) {
        return null;
      } else {
        onClose(event);
      }
    };
    document.addEventListener(
      "click",
      listener
    );
    return () => {
      document.removeEventListener(
        "click",
        listener
      );
    };
  }, [ref, onClose]);

  return ref;
};

export const useTimedBoolean = (
  count?: number
) => {
  const [isOn, setOn] = useState(false);
  const timeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const init =
    async (): Promise<void> =>
      new Promise((resolve) => {
        setOn(true);
        timeoutRef.current = setTimeout(
          () => {
            setOn(false);
            resolve();
          },
          count ?? 500
        );
        setOn(true);
      });

  return { init, isOn };
};

/**
  useThrottledCallback source 
  @see https://gist.github.com/Danziger/336e75b6675223ad805a88c2dfdcfd4a#file-throttled-callback-hook-ts
**/

export const useThrottledCallback = <
  A extends any[]
>(
  callback: (...args: A) => void,
  delay: number
): ((...args: A) => void) => {
  const timeoutRef = useRef<number>();
  const callbackRef = useRef(callback);
  const lastCalledRef = useRef(0);

  // Remember the latest callback:
  //
  // Without this, if you change the callback, when setTimeout kicks in, it
  // will still call your old callback.
  //
  // If you add `callback` to useCallback's deps, it will also update, but it
  // might be called twice if the timeout had already been set.

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Clear timeout if the components is unmounted or the delay changes:
  useEffect(
    () =>
      window.clearTimeout(
        timeoutRef.current
      ),
    [delay]
  );

  return useCallback(
    (...args: A) => {
      // Clear previous timer:
      window.clearTimeout(
        timeoutRef.current
      );

      function invoke() {
        callbackRef.current(...args);
        lastCalledRef.current =
          Date.now();
      }

      // Calculate elapsed time:
      const elapsed =
        Date.now() -
        lastCalledRef.current;

      if (elapsed >= delay) {
        // If already waited enough, call callback:
        invoke();
      }
      //  else {
      //   // Otherwise, we need to wait a bit more:
      //   timeoutRef.current = window.setTimeout(invoke, delay - elapsed);
      // }
    },
    [delay]
  );
};

export const scrollIntoView = (
  element: HTMLElement | null,
  opts: ScrollIntoViewOptions = {}
): boolean => {
  try {
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        ...opts,
      });
      element.focus();
    }
    return true;
  } catch (error: any) {
    return false;
  }
};
