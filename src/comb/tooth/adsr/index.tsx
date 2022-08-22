import type { FC } from "react";
import { useAdsr } from "../config/useAdsr";

export type TAdsrProps = {
  children?: JSX.Element;
};
export const Adsr: FC<TAdsrProps> = ({
  children,
}) => {
  useAdsr();
  return <>{children}</>; 
};
