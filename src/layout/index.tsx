import { Suspense } from "react";
import {
  useLocation,
  useRoutes,
} from "react-router-dom";
import pageRoutes from "~react-pages";
import { Provider } from "../state/Provider";
import { Header } from "./header";

export const Layout = () => {
  const location = useLocation();
  const pages = useRoutes(
    pageRoutes,
    location
  );
  return (
    <Suspense
      fallback={<p>Loading...</p>}
    >
      <Provider>
        <Header />
        <>{pages}</>
      </Provider>
    </Suspense>
  );
};
