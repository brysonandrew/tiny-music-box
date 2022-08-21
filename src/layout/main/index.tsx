import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { Comb } from "../../comb";
import { useContext } from "../../state/Context";
import {
  GLASS_BLUE,
  GLASS_WHITE,
  SIDE_WIDTH,
} from "../../styles/constants";
import { GLASS_CSS } from "../../styles/glass";

const Root = styled(motion.div)`
  ${GLASS_CSS}
  background-image: radial-gradient(
      ellipse at top,
      ${GLASS_BLUE},
      transparent
    ),
    radial-gradient(
      ellipse at bottom,
      ${GLASS_WHITE},
      transparent
    );
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
`;

export const Main = () => {
  const { menu, dispatch } =
    useContext();

  const isSide = Boolean(menu);

  return (
    <Root
      style={{
        left: isSide ? -SIDE_WIDTH : 0,
      }}
    >
      <Comb />
    </Root>
  );
};
