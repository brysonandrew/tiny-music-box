import { Suspense } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import pageRoutes from "~react-pages";

export const App = () => {
  const location = useLocation();
  const pages = useRoutes(pageRoutes, location);
  return <Suspense fallback={<p>Loading...</p>}>{pages}</Suspense>;
};
