import type { FC } from "react";
import styled from "@emotion/styled";
import { BACKGROUND_COLOR } from "../../data/styles";
import { blankPageCss } from "./css";

const Root = styled.div`
  ${blankPageCss}
  background-color: ${BACKGROUND_COLOR};
  overflow: hidden;
  font-weight: 300;
  text-shadow: 3px 3px 1px #47391d;
  letter-spacing: 5px;
`;

type TProps = { children: null | string | JSX.Element | JSX.Element[] };
export const Blank: FC<TProps> = ({ children }) => <Root>{children}</Root>;
