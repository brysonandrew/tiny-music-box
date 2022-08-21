import type { FC } from "react";
import type { TContext } from "./types";
import { Context } from "./Context";

type TConsumerProps = {
  children(
    values: TContext
  ): JSX.Element;
};
export const Consumer: FC<
  TConsumerProps
> = ({ children }) => (
  <Context.Consumer>
    {children}
  </Context.Consumer>
);
