import styled from "@emotion/styled";
import { MotionConfig } from "framer-motion";
import { Tooth } from "../tooth";

const Root = styled.ul``;

export const Comb = () => (
  <Root>
    {[...Array(12)].map(
      (_, index: number) => (
        <Tooth
          key={`Tooth-${index}`}
          index={index}
        />
      )
    )}
  </Root>
);
