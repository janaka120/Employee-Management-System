import axios from "axios";
import { API_BASE_URL } from "../../../constants/EmployeeConstant";
import { isCompleteEmployee } from "../../../utils/helper";
import { AddEmployeeDataI, ApiResponse, EmployeeI } from "../employeeTypes";

const formateEmployeesData = (data: EmployeeI[]) => {
  if (!data) {
    return [];
  }

  return (
    data?.filter((employee: EmployeeI) => isCompleteEmployee(employee)) || []
  );
};

export const getAllEmployees = async (): Promise<EmployeeI[]> => {
  const response = await axios.get(`${API_BASE_URL}/employees`);
  const resData: ApiResponse = response?.data;
  if (resData && resData.status === "success") {
    return formateEmployeesData(resData.data);
  }

  throw new Error(resData.message || "Fail to fetch employees");
};

export const addEmployee = async (data: AddEmployeeDataI) => {
  const response: ApiResponse = await axios.post(
    `${API_BASE_URL}/employees`,
    data
  );
  const resData: ApiResponse = response?.data;
  if (resData.status === "success") {
    return resData.data;
  }

  throw new Error(resData.message || "Fail to add employee");
};
