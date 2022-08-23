import { useContext } from "../../../../state/Context";
import type { TConnectReturn } from "../useConnect";

type TConfig = TConnectReturn;

export const useTweak = ({
  o,
  g,
}: TConfig) => {
  const { wave, dispatch } =
    useContext();
  o.type = wave;

  console.log("tweak");
};
