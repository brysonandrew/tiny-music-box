import { useContext } from "../../../../state/Context";
import type { TConnectReturn } from "../useConnect";
import { useBitcrusher } from "./useBitcrusher";
import { useLowpass } from "./useLowpass";
import { useLowpass2 } from "./useLowpass2";
import { useMoog } from "./useMoog";

type TConfig = TConnectReturn;

export const useTweak = ({
  o,
  g,
}: TConfig) => {
  const { wave } = useContext();
  o.type = wave;
  useMoog(g);
  useLowpass(g);
  useLowpass2(g);
  useBitcrusher(g);
};
