import ReactDOM from "react-dom/client";
import ErrorBoundary from "./templates/ErrorBoundary";
import { App } from "./app";
import { BrowserRouter as Router } from "react-router-dom";
import "./css/fonts.css";
import "./css/reset.css";

const root = document.getElementById("root");
if (root)
  ReactDOM.createRoot(root).render(
    <ErrorBoundary>
    <Router>
      <App />
    </Router>
  </ErrorBoundary>
  );
