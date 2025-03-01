import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css"; // ✅ Global Styles Import

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);
