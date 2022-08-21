import type { FC } from "react";
import { Context } from "./Context";
import type { TState } from "./types";

type TConsumerProps = { children(values: TState): JSX.Element };
export const Consumer: FC<TConsumerProps> = ({ children }) => (
  <Context.Consumer>{children}</Context.Consumer>
);
