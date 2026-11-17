import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import ClientApp from "./app/ClientApp.jsx";
import "./styles/global.css";

const root = document.getElementById("root");
const app = <ClientApp initialPath={window.location.pathname} />;

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
