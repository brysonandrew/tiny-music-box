import { MotionConfig } from "framer-motion";


export default () => (
    <MotionConfig
      transition={{ ease: "easeIn", type: "tween", duration: 0.2 }}
    >
      <div>hi</div>
    </MotionConfig>
);
