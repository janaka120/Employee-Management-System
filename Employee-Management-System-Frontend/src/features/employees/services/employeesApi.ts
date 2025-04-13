import { API_BASE_URL } from "../../../constants/EmployeeConstant";
import { isCompleteEmployee } from "../../../utils/helper";
import { EmployeeI } from "../employeeTypes";

const formateEmployeesData = (data: EmployeeI[]) => {
  if (!data) {
    return [];
  }

  return (
    data?.filter((employee: EmployeeI) => isCompleteEmployee(employee)) || []
  );
};

export const getAllEmployees = async (): Promise<EmployeeI[]> => {
  const response = await fetch(`${API_BASE_URL}/employees`);
  const res = await response.json();
  if (res.status === "success") {
    return formateEmployeesData(res.data);
  }

  throw new Error(res.message || "Fail to fetch employees");
};
