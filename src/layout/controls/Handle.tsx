import type { PanInfo } from "framer-motion";
import {
  motion,
  useAnimationControls,
  useMotionValue,
} from "framer-motion";
import styled from "@emotion/styled";
import { useContext } from "../../state/Context";
import {
  GLASS_BORDER,
  HARD_WHITE,
  GLASS_BLACK,
  GLASS_PURPLE_0125,
} from "../../styles/constants";

const X_WIDTH = 20;
const Root = styled(motion.div)`
  position: fixed;
  width: 200%;
  left: -50%;
  bottom: 24px;
  height: 48px;
  border: ${GLASS_BORDER};
  background-color: ${HARD_WHITE};
  background-image: radial-gradient(
    ${GLASS_BLACK} 0.5px,
    ${GLASS_PURPLE_0125} 0.5px
  );
  background-size: 10px 10px;
  z-index: 2;
`;

export const Handle = () => {
  const { dispatch } = useContext();
  const xValue = useMotionValue(0);
  const animationControlsHandle =
    useAnimationControls();

  const handleDragEnd = (
    _: DragEvent,
    info: PanInfo
  ) => {
    const value =
      info.offset.x / window.innerWidth;
    dispatch({
      type: "x",
      value,
    });
  };

  return (
    <Root
      style={{ x: xValue }}
      drag="x"
      dragConstraints={{
        left: -X_WIDTH,
        top: 0,
        right: X_WIDTH,
        bottom: 0,
      }}
      dragElastic={0.5}
      animate={animationControlsHandle}
      onDragEnd={handleDragEnd}
    />
  );
};
