import type { FC } from "react";
import { usePlay } from "./usePlay";

export type TPlayProps = {
  children?: JSX.Element;
};
export const Play: FC<TPlayProps> = ({
  children,
}) => {
  usePlay();
  return <>{children}</>; 
};
