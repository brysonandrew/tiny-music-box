import type { FC } from "react";
import { useContext } from "../../../state/Context";
import { useContext as useToothContext } from "../../../state/tooth/Context";

import { useConnect } from "../config/useConnect";

export type TConnectProps = {
  children?:
    | JSX.Element
    | JSX.Element[];
};
export const Connect: FC<
  TConnectProps
> = ({ children }) => {
  const { midis } = useContext();
  const { midi } = useToothContext();

  // console.log(midi);
  // console.log(midis);
  // console.log(midis[midi]);

  useConnect();
  if (!midis[midi]) return null;
  console.log(`ACTIVE:
  midi ${midi}`);
  return <>{children}</>;
};
