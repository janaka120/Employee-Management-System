import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import "@ant-design/v5-patch-for-react-19";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
