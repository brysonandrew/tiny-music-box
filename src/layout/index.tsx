import styled from "@emotion/styled";
import {
  AnimatePresence,
  motion,
  MotionConfig,
} from "framer-motion";
import {
  Suspense,
  useState,
} from "react";
import {
  useLocation,
  useRoutes,
} from "react-router-dom";
import pageRoutes from "~react-pages";
import { useContext } from "../state/Context";
import {
  GAP,
  GLASS_BLUE,
  GLASS_RED,
  GLASS_WHITE,
} from "../styles/constants";
import {
  columnEnd,
  columnStartEnd,
  rowCenter,
} from "../styles/decorators";
import { GLASS_CSS } from "../styles/glass";
import { Header } from "./header";
import { RECORD } from "./header/menu";
const SIDE_WIDTH = 280;

const Main = styled(motion.div)`
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

const Fixed = styled.div`
  ${columnStartEnd}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const Side = styled(motion.div)`
  ${GLASS_CSS}
  background-image: radial-gradient(
      ellipse at top,
      ${GLASS_RED},
      transparent
    ),
    radial-gradient(
      ellipse at bottom,
      ${GLASS_WHITE},
      transparent
    );
  width: ${SIDE_WIDTH}px;
  padding: ${GAP}px;
  height: 100%;
  flex-grow: 1;
`;

export const Layout = () => {
  const [isAnimating, setAnimating] =
    useState<boolean>(false);
  const { menu } = useContext();
  const location = useLocation();
  const pages = useRoutes(
    pageRoutes,
    location
  );

  const handleLayoutAnimationComplete =
    () => {
      setAnimating(false);
    };
  const handleLayoutAnimationStart =
    () => {
      setAnimating(true);
    };

  const isSide = Boolean(menu);

  return (
    <Suspense
      fallback={<p>Loading...</p>}
    >
      <MotionConfig
        transition={{
          ease: "easeInOut",
          duration: 2,
        }}
      >
        <Main
          layout
          onLayoutAnimationStart={
            handleLayoutAnimationStart
          }
          onLayoutAnimationComplete={
            handleLayoutAnimationComplete
          }
          style={{
            // width: `calc(100% - ${
            //   isSide ? SIDE_WIDTH : 0
            // }px)`,
            left: isSide
              ? -SIDE_WIDTH
              : 0,
          }}
        >
          {pages}
        </Main>
        <Fixed>
          <Header />
          <AnimatePresence mode="popLayout">
            {menu && (
              <Side
                layout="position"
                style={{ x: 0, y: 0 }}
                key={menu}
                initial={{
                  x: "100%",
                }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
              >
                {RECORD[menu]}
              </Side>
            )}
          </AnimatePresence>
        </Fixed>
      </MotionConfig>
    </Suspense>
  );
};
