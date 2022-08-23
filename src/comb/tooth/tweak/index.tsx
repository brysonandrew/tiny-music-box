import type { FC } from "react";
import { useTweak } from "../play/tweak/useNoise";

export type TTweakProps = {
  children?: JSX.Element;
};
export const Tweak: FC<TTweakProps> = ({
  children,
}) => {
  useTweak(); 
  return <>{children}</>; 
};
