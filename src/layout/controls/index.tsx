import {
  AnimatePresence,
  motion,
} from "framer-motion";
import styled from "@emotion/styled";
import { useContext } from "../../state/Context";
import {
  HEADER_HEIGHT,
  GLASS_BLUE,
  GLASS_WHITE_02,
  SIDE_WIDTH,
  GLASS_PURPLE_BORDER,
  GAP,
} from "../../styles/constants";
import { columnStartEnd } from "../../styles/decorators";
import { GLASS_CSS } from "../../styles/glass";
import { Header } from "../header";
import { RECORD } from "../header/menu";
import { Handle } from "./Handle";

const Root = styled.div`
  ${columnStartEnd}
  position: fixed;
  top: 0;
  left: 0;
  height: ${HEADER_HEIGHT}px;
  width: 100%;
`;

const Side = styled(motion.div)`
  ${GLASS_CSS}
  background-image: radial-gradient(
      ellipse at top,
      ${GLASS_BLUE},
      transparent
    ),
    radial-gradient(
      ellipse at bottom,
      ${GLASS_WHITE_02},
      transparent
    );
  width: ${SIDE_WIDTH}px;
  border-left: ${GLASS_PURPLE_BORDER};
  padding: ${GAP}px;
  flex-grow: 1;
`;

export const Controls = () => {
  const { menu } = useContext();
  return (
    <Root>
      <Header />
      <AnimatePresence mode="popLayout">
        {menu && (
          <Side
            layout="position"
            style={{ y: 0 }}
            key={menu}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
          >
            {RECORD[menu]}
          </Side>
        )}
      </AnimatePresence>
      <Handle />
    </Root>
  );
};
