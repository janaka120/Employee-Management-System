import { createBrowserRouter, RouteObject } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../pages/NotFoundPage";
import { homeRoute, employeeRoutes } from "./EmployeeRoutes";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [homeRoute, ...employeeRoutes],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(routes);
