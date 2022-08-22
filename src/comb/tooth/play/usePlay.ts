import { useAdsr } from "./adsr";
import { useCleanUp } from "./useCleanUp";
import { useConnect } from "./useConnect";

export const usePlay = () => {
  const { o, g } = useConnect();
  useAdsr({ o, g });
  useCleanUp({ o, g });
};
