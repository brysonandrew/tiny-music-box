import ReactDOM from "react-dom/client";
import ErrorBoundary from "./templates/ErrorBoundary";
import { Layout } from "./layout";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/fonts.css";
import "./styles/reset.css";
import { Provider } from "./state/Provider";

const root =
  document.getElementById("root");
if (root)
  ReactDOM.createRoot(root).render(
    <Provider>
      <ErrorBoundary>
        <Router>
          <Layout />
        </Router>
      </ErrorBoundary>
    </Provider>
  );
