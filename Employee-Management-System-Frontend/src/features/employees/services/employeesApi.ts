import axios from "axios";
import { API_BASE_URL } from "../../../constants/EmployeeConstant";
import { isCompleteEmployee } from "../../../utils/helpers";
import { EmployeeFromDataI, ApiResponse, EmployeeI } from "../EmployeeTypes";
import { QueryFunctionContext } from "@tanstack/react-query";

const formateEmployeesData = (data: EmployeeI[]) => {
  if (!data) {
    return [];
  }

  return (
    data?.filter((employee: EmployeeI) => isCompleteEmployee(employee)) || []
  );
};

export const getAllEmployees = async (): Promise<EmployeeI[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`);
    const resData: ApiResponse = response?.data;
    if (resData && resData.status === "success") {
      return formateEmployeesData(resData.data);
    }

    throw new Error(resData.message || "Fail to fetch employees");
  } catch (e) {
    console.log("Error | getAllEmployees:", e);
    throw new Error("Something went wrong");
  }
};

export const addEmployee = async (data: EmployeeFromDataI) => {
  try {
    const response: ApiResponse = await axios.post(
      `${API_BASE_URL}/employees`,
      data
    );
    const resData: ApiResponse = response?.data;
    if (resData.status === "success") {
      return resData.data;
    }

    throw new Error(resData.message || "Fail to add employee");
  } catch (e) {
    console.log("Error | addEmployee:", e);
    throw new Error("Something went wrong");
  }
};

type updateEmployeeParam = { id: string; data: EmployeeFromDataI };
export const updateEmployee = async (payload: updateEmployeeParam) => {
  try {
    const { id, data } = payload;
    if (!id) {
      throw new Error("Employee uuid required");
    }
    const response: ApiResponse = await axios.put(
      `${API_BASE_URL}/employees/${id}`,
      data
    );
    const resData: ApiResponse = response?.data;
    if (resData.status === "success") {
      return resData.data;
    }

    throw new Error(resData.message || "Fail to update employee");
  } catch (e) {
    console.log("Error | updateEmployee:", e);
    throw new Error("Something went wrong");
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Employee uuid required");
    }
    const response: ApiResponse = await axios.delete(
      `${API_BASE_URL}/employees/${id}`
    );
    const resData: ApiResponse = response?.data;
    if (resData.status === "success") {
      return resData.data;
    }

    throw new Error(resData.message || "Fail to delete employee");
  } catch (e) {
    console.log("Error | deleteEmployee:", e);
    throw new Error("Something went wrong");
  }
};

export const employeeDetailsQueryKey = (id: string | undefined) => [
  "employee",
  id,
];

export const getEmployeeDetails = async (
  context: QueryFunctionContext<ReturnType<typeof employeeDetailsQueryKey>>
): Promise<EmployeeI> => {
  try {
    const [_, id] = context.queryKey;
    if (!id) {
      throw new Error("Employee uuid required");
    }
    const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
    const resData: ApiResponse = response?.data;
    if (resData && resData.status === "success") {
      return resData.data;
    }

    throw new Error(resData.message || "Fail to fetch employee details");
  } catch (e) {
    console.log("Error | getEmployeeDetails:", e);
    throw new Error("Something went wrong");
  }
};
