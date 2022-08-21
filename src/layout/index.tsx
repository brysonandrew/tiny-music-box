import { MotionConfig } from "framer-motion";
import { Comb } from "../comb";
import { Provider } from "../state/Provider";
import { Controls } from "./controls";

export const Layout = () => (
  <Provider>
    <MotionConfig
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
    >
      <Comb />
      <Controls />
    </MotionConfig>
  </Provider>
);
