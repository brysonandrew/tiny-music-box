import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { Comb } from "../../comb";
import {
  Context,
  useContext,
} from "../../state/Context";
import {
  GLASS_BLUE,
  GLASS_WHITE_02,
  SIDE_WIDTH,
} from "../../styles/constants";
import { GLASS_CSS } from "../../styles/glass";
import { Canvas } from "@react-three/fiber";
import { useContextBridge } from "@react-three/drei";

const Root = styled(motion.div)`
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
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
`;

export const Main = () => {
  const { menu } = useContext();
  const isSide = Boolean(menu);
  const ContextBridge =
    useContextBridge(Context);

  return (
    <Root
      layout
      style={{
        left: isSide ? -SIDE_WIDTH : 0,
      }}
    >
      <Canvas>
        <ContextBridge>
          <Comb />
        </ContextBridge>
      </Canvas>
    </Root>
  );
};
