import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  useLocation,
  useRoutes,
} from "react-router-dom";
import pageRoutes from "~react-pages";
import ErrorBoundary from "./templates/ErrorBoundary";
import "./styles/fonts.css";
import "./styles/reset.css";
import { Provider } from "./state/Provider";

const App = () => {
  const location = useLocation();
  const pages = useRoutes(
    pageRoutes,
    location
  );
  return (
    <Suspense
      fallback={<p>Loading...</p>}
    >
      {pages}
    </Suspense>
  );
};

const root =
  document.getElementById("root");
if (root)
  ReactDOM.createRoot(root).render(
    <Provider>
      <ErrorBoundary>
        <Router>
          <App />
        </Router>
      </ErrorBoundary>
    </Provider>
  );
