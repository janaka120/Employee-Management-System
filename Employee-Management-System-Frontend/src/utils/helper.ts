import {
  DATE_FORMATE,
  SINGAPORE_COUNTRY_CODE,
} from "../constants/EmployeeConstant";
import { EmployeeI } from "../features/employees/employeeTypes";
import dayjs, { Dayjs } from "dayjs";

/**
 * validate given employee data valid
 * @param employee EmployeeI
 * @returns boolean
 */
export const isCompleteEmployee = (employee: EmployeeI) => {
  return !!(
    employee.uuid &&
    employee.firstName &&
    employee.lastName &&
    employee.gender &&
    employee.joinedDate &&
    employee.phone &&
    employee.dob &&
    employee.email
  );
};

/**
 * validate given date is validate date and is not future date
 * @param dateString string | undefined | null
 * @returns boolean | string
 */
export const validateDate = (
  dateString: string | undefined | null
): boolean | string => {
  if (!dateString) return true;
  const selectedDate = dayjs(dateString, DATE_FORMATE);

  if (!selectedDate.isValid()) return "Invalid date format";

  if (selectedDate.isAfter(dayjs().startOf("day"))) {
    return "Date cannot be in the future";
  }
  return true;
};

/**
 * validate singapore phone number
 * @param phoneNumber: string | null | undefined
 * @returns boolean | string
 */
export function validPhoneNumber(
  phoneNumber: string | null | undefined
): boolean | string {
  if (!phoneNumber || typeof phoneNumber !== "string") {
    return true;
  }

  let cleanedNumber = phoneNumber.trim();

  if (cleanedNumber.startsWith(SINGAPORE_COUNTRY_CODE)) {
    cleanedNumber = cleanedNumber.substring(3);
  }

  cleanedNumber = cleanedNumber.replace(/[\s-]/g, "");

  const sgPhoneRegex = /^[689]\d{7}$/;
  const isValidNumber = sgPhoneRegex.test(cleanedNumber);

  if (!isValidNumber) {
    return "Phone Number not valid";
  }
  return true;
}

export const formatDate = (date: Dayjs | null | undefined): string => {
  return date ? date.format(DATE_FORMATE) : "";
};

/**
 * validate given name | Minimum 6 characters, maximum 10 characters
 * @param name: string | null | undefined
 * @returns boolean | string
 */
export function validName(name: string | null | undefined): boolean | string {
  if (!name || typeof name !== "string") {
    return true;
  }

  if (name.length < 6) {
    return "Minimum 6 characters required";
  }

  if (name.length < 6 || name.length > 10) {
    return "Maximum 10 characters exceeded";
  }

  return true;
}

export const isJoinedDateAfterDOB = (
  joinedDate: string | null | undefined,
  dateOfBirth: string | null | undefined
): true | string => {
  if (!joinedDate || !dateOfBirth) {
    return true; // Adjust based on your requirements for empty dates
  }
  const joinedDateObj = dayjs(joinedDate, DATE_FORMATE);

  if (!joinedDateObj.isValid()) return "Invalid date format";

  if (joinedDateObj.isAfter(dayjs().startOf("day"))) {
    return "Date cannot be in the future";
  }

  const dateOfBirthObj = dayjs(dateOfBirth, DATE_FORMATE);
  if (!joinedDateObj.isValid() || !dateOfBirthObj.isValid()) {
    return "Invalid date format.";
  }
  if (!joinedDateObj.isAfter(dateOfBirthObj)) {
    return "Joined Date must be on or after Date of Birth.";
  }
  return true;
};
