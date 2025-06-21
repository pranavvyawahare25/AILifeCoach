import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Make sure environment variables are accessible
declare global {
  interface ImportMeta {
    env: {
      VITE_CLERK_PUBLISHABLE_KEY: string;
      // Add other environment variables as needed
    };
  }
}

createRoot(document.getElementById("root")!).render(<App />);
