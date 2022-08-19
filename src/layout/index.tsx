import styled from "@emotion/styled";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { Suspense } from "react";
import {
  useLocation,
  useRoutes,
} from "react-router-dom";
import pageRoutes from "~react-pages";
import { useContext } from "../state/Context";
import { Provider } from "../state/Provider";
import { rowCenter } from "../styles/decorators";
import { Header } from "./header";
import { RECORD } from "./header/menu";

const Body = styled.div`
  ${rowCenter}
  width: 100%;
`;

const Main = styled.div`
  background: green;
  width: calc(100% - 100px);
`;

const Side = styled(motion.div)`
  ${rowCenter}
  width: 100px;
  background: red;
`;

export const Layout = () => {
  const { menu } = useContext();
  const location = useLocation();
  const pages = useRoutes(
    pageRoutes,
    location
  );

  console.log(menu);

  return (
    <Suspense
      fallback={<p>Loading...</p>}
    >
      <Header />
      <Body>
        <Main>{pages}</Main>
        <AnimatePresence mode="popLayout">
          {menu && (
            <Side
              key={menu}
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              exit={{ x: 10 }}
            >
              {RECORD[menu]}
            </Side>
          )}
        </AnimatePresence>
      </Body>
    </Suspense>
  );
};
