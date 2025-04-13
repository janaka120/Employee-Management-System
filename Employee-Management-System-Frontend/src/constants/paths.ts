export const PATHS = {
  HOME: "/",
  EMPLOYEE_LIST: "/employee/list",
  ADD_EMPLOYEE_DETAIL: "/employee/add",
  EDIT_EMPLOYEE_DETAIL: (employeeId: string) => `/employee/edit/${employeeId}`,
};
