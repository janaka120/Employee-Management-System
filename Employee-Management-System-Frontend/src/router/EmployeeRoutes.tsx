import React from "react";
import { RouteObject } from "react-router-dom";
import { PATHS } from "../constants/Paths.ts";

const EmployeeListPage = React.lazy(
  () => import("../features/employees/pages/employeeList/EmployeeListPage.tsx")
);
const AddEmployeePage = React.lazy(
  () =>
    import("../features/employees/pages/addEmployee/AddEmployeeDetailsPage.tsx")
);
const EditEmployeePage = React.lazy(
  () =>
    import(
      "../features/employees/pages/editEmployee/EditEmployeeDetailsPage.tsx"
    )
);

export const employeeRoutes: RouteObject[] = [
  {
    path: PATHS.EMPLOYEE_LIST,
    element: <EmployeeListPage />,
  },
  {
    path: PATHS.ADD_EMPLOYEE_DETAIL,
    element: <AddEmployeePage />,
  },
  {
    path: "/employee/edit/:employeeId",
    element: <EditEmployeePage />,
  },
];

export const homeRoute: RouteObject = {
  index: true,
  element: <EmployeeListPage />,
};
