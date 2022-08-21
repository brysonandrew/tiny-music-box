import { MotionConfig } from "framer-motion";
import { Provider } from "../state/Provider";
import { Controls } from "./controls";
import { Main } from "./main";

export const Layout = () => (
  <Provider>
    <MotionConfig
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
    >
      <Main /> 
      <Controls />
    </MotionConfig>
  </Provider>
);
