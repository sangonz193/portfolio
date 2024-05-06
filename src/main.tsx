import "./index.css";
import "./reset.css";
import "../vite-env";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { Landing } from "./components/landing/landing";

const asOS = import.meta.env.VITE_APP_AS_OS === "true";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{asOS ? <App /> : <Landing />}</React.StrictMode>
);
