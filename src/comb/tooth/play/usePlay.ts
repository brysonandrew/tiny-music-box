import { useAdsr } from "./adsr";
import { useTweak } from "./tweak";
import { useCleanUp } from "./useCleanUp";
import { useConnect } from "./useConnect";

export const usePlay = () => {
  const { o, g } = useConnect();
  useAdsr({ o, g });
  useTweak({ o, g });
  useCleanUp({ o, g });
};
