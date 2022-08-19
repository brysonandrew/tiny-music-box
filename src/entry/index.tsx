import { MotionConfig } from "framer-motion";
import { Comb } from "../comb";
import { Provider } from "../state/Provider";

export default () => (
  <Provider>
    <MotionConfig
      transition={{
        ease: "easeIn",
        type: "tween",
        duration: 0.2,
      }}
    >
      <Comb />
    </MotionConfig>
  </Provider>
);
