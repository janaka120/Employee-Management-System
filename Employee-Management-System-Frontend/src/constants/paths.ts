export const PATHS = {
  HOME: "/",
  EMPLOYEES: "/employees",
  ADD_EMPLOYEE_DETAIL: "/employee/add",
  EDIT_EMPLOYEE_DETAIL: (employeeId: string) => `/employee/edit/${employeeId}`,
};
