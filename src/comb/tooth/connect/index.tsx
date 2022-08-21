import type { FC } from "react";
import { useConnect } from "../config/useConnect";

export type TConnectProps = {
  children: JSX.Element;
};
export const Connect: FC<
  TConnectProps
> = ({ children }) => {
  useConnect();
  return <>{children}</>;
};
