import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import "../src/components/Calendar/index.css";
const helmetContext = {};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
