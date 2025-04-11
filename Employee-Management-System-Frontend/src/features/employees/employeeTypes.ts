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

type GenderType = "Male" | "Female" | "Other";
