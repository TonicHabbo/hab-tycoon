import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./assets/styles/index.scss";

window.resizeTo(500, 800);

createRoot(document.getElementById("root")).render(<App />);
