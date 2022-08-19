import styled from "@emotion/styled";
import { motion, useMotionValue } from "framer-motion";
import { Blank } from "../../../templates/blank";

const Canvas = styled(motion.canvas)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const Fake3d = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  //   const canvasRef = useGlInstance(
  //     instanceConfig({
  //       uniforms: { mouse: { ...(isPressed ? { x, y } : prevM), ...negativePrevM } },
  //     })
  //   );

  return (
    <Blank>
      <Canvas
        // ref={canvasRef}
        onPointerMove={(e) => {
          mouseX.set(e.clientX / window.innerWidth);
          mouseY.set(e.clientY / window.innerHeight);
        }}
      />
    </Blank>
  );
};

export default Fake3d;
