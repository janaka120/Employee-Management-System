export interface Employee {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: GenderType;
  dob: string;
  joinedDate: string;
  createdAt: Date;
  updatedAt: Date;
}

type GenderType = "Male" | "Female" | "Other";
