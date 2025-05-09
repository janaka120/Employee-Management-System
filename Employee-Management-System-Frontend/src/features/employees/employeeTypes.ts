export interface EmployeeI {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: GenderType;
  dob: string;
  joinedDate: string;
}

export type GenderType = "Male" | "Female" | "Other";

export type EmployeeFormDataI = Omit<EmployeeI, "gender"> & {
  gender: GenderType | null;
};

export interface ApiResponse {
  status: "success" | "fail";
  data?: any;
  message?: string;
}

export type EmployeeFromDataI = Omit<EmployeeI, "uuid">;
