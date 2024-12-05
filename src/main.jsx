import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

// Hydrater l'application
hydrateRoot(
    document.getElementById("root"),
    <App />
);
