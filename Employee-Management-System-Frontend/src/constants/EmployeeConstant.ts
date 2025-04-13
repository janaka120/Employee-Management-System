import { GenderType } from "../features/employees/employeeTypes";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const GENDER_MENU: GenderType[] = ["Male", "Female", "Other"];
export const DATE_FORMATE = "YYYY-MM-DD";

export const DEFAULT_EMPLOYEE_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: null,
  dob: "",
  joinedDate: "",
};

export const VALID_EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const SINGAPORE_COUNTRY_CODE = "+65";
