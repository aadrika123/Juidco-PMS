import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CustomErrorBoundaryForRoutes from "@/Components/Common/CustomErrorBoundaryForRoutes.jsx";

// Production-only: Hide React version
if (import.meta.env.PROD) {
  // Disable React DevTools
  if (typeof window !== "undefined") {
    const noop = () => undefined;
    const DEV_TOOLS = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

    if (typeof DEV_TOOLS === "object") {
      for (const prop in DEV_TOOLS) {
        if (typeof DEV_TOOLS[prop] === "function") {
          DEV_TOOLS[prop] = noop;
        } else {
          DEV_TOOLS[prop] = null;
        }
      }
    }
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/procurement">
      <Suspense
        fallback={
          <div className="font-bold text-lg italic h-screen w-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <CustomErrorBoundaryForRoutes errorMsg="Something went wrong. Please try again later !">
          <App />
        </CustomErrorBoundaryForRoutes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
