import {
  formatDate,
  isCompleteEmployee,
  isJoinedDateAfterDOB,
  validateDate,
  validName,
  validPhoneNumber,
} from "../helpers";
import { EmployeeI, GenderType } from "../../features/employees/EmployeeTypes";
import dayjs from "dayjs";
import { DATE_FORMATE } from "../../constants/EmployeeConstant";

const validEmployee: EmployeeI = {
  uuid: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "1234567890",
  gender: "Male" as GenderType,
  dob: "1990-01-01",
  joinedDate: "2022-01-01",
};

describe("isCompleteEmployee", () => {
  it("returns true for complete employee data", () => {
    expect(isCompleteEmployee(validEmployee)).toBe(true);
  });

  it("returns false if uuid is missing", () => {
    const employee = { ...validEmployee, uuid: "" };
    expect(isCompleteEmployee(employee)).toBe(false);
  });

  it("returns false if firstName is missing", () => {
    const employee = { ...validEmployee, firstName: "" };
    expect(isCompleteEmployee(employee)).toBe(false);
  });

  it("returns false if lastName is missing", () => {
    const employee = { ...validEmployee, lastName: "" };
    expect(isCompleteEmployee(employee)).toBe(false);
  });

  it("returns false if email is missing", () => {
    const employee = { ...validEmployee, email: "" };
    expect(isCompleteEmployee(employee)).toBe(false);
  });

  it("returns false if phone is missing", () => {
    const employee = { ...validEmployee, phone: "" };
    expect(isCompleteEmployee(employee)).toBe(false);
  });

  it("returns false if gender is missing", () => {
    const employee = { ...validEmployee, gender: "" as GenderType };
    expect(isCompleteEmployee(employee)).toBe(false);
  });

  it("returns false if dob is missing", () => {
    const employee = { ...validEmployee, dob: "" };
    expect(isCompleteEmployee(employee)).toBe(false);
  });

  it("returns false if joinedDate is missing", () => {
    const employee = { ...validEmployee, joinedDate: "" };
    expect(isCompleteEmployee(employee)).toBe(false);
  });
});

describe("validateDate", () => {
  it("returns true for undefined, null, or empty string", () => {
    expect(validateDate(undefined)).toBe(true);
    expect(validateDate(null)).toBe(true);
    expect(validateDate("")).toBe(true);
  });

  it("returns error for invalid date format", () => {
    expect(validateDate("not-a-date")).toBe("Invalid date format");
    expect(validateDate("2022-31-01")).toBe(true); // wrong format
  });

  it("returns error if date is in the future", () => {
    const futureDate = dayjs().add(1, "day").format(DATE_FORMATE);
    expect(validateDate(futureDate)).toBe("Date cannot be in the future");
  });

  it("returns true for valid past date", () => {
    const pastDate = dayjs().subtract(1, "day").format(DATE_FORMATE);
    expect(validateDate(pastDate)).toBe(true);
  });

  it("returns true for today's date", () => {
    const today = dayjs().format(DATE_FORMATE);
    expect(validateDate(today)).toBe(true);
  });
});

describe("validPhoneNumber", () => {
  it("returns true for null, undefined, or non-string", () => {
    expect(validPhoneNumber(null)).toBe(true);
    expect(validPhoneNumber(undefined)).toBe(true);
  });

  it("returns true for valid Singapore phone numbers", () => {
    expect(validPhoneNumber("81234567")).toBe(true);
    expect(validPhoneNumber("61234567")).toBe(true);
    expect(validPhoneNumber("91234567")).toBe(true);
    expect(validPhoneNumber("+6581234567")).toBe(true);
    expect(validPhoneNumber("+65 8123 4567")).toBe(true);
    expect(validPhoneNumber("+65-8123-4567")).toBe(true);
  });

  it("returns error for invalid prefix", () => {
    expect(validPhoneNumber("31234567")).toBe("Phone Number not valid");
    expect(validPhoneNumber("51234567")).toBe("Phone Number not valid");
  });

  it("returns error for incorrect length", () => {
    expect(validPhoneNumber("8123456")).toBe("Phone Number not valid"); // 7 digits
    expect(validPhoneNumber("812345678")).toBe("Phone Number not valid"); // 9 digits
  });

  it("returns error for non-numeric values", () => {
    expect(validPhoneNumber("8123abcd")).toBe("Phone Number not valid");
    expect(validPhoneNumber("+65-8123-abcd")).toBe("Phone Number not valid");
  });
});

describe("formatDate", () => {
  it("formats a valid Dayjs date using DATE_FORMATE", () => {
    const date = dayjs("2024-04-14");
    const expected = date.format(DATE_FORMATE);
    expect(formatDate(date)).toBe(expected);
  });

  it("returns empty string when date is null", () => {
    expect(formatDate(null)).toBe("");
  });

  it("returns empty string when date is undefined", () => {
    expect(formatDate(undefined)).toBe("");
  });
});

describe("validName", () => {
  it("returns true for valid name between 6 and 10 characters", () => {
    expect(validName("JohnDoe")).toBe(true);
    expect(validName("ABCDEFGHIJ")).toBe(true);
  });

  it("returns minimum length error if name is shorter than 6", () => {
    expect(validName("John")).toBe("Minimum 6 characters required");
  });

  it("returns maximum length error if name is longer than 10", () => {
    expect(validName("VeryLongNameHere")).toBe(
      "Maximum 10 characters exceeded"
    );
  });

  it("returns true for null or undefined input", () => {
    expect(validName(null)).toBe(true);
    expect(validName(undefined)).toBe(true);
  });

  it("returns true for empty string", () => {
    expect(validName("")).toBe(true);
  });
});

describe("isJoinedDateAfterDOB", () => {
  it("returns true if both dates are valid and joinedDate is after dob", () => {
    const dob = "2000-01-01";
    const joined = "2020-01-01";
    expect(isJoinedDateAfterDOB(joined, dob)).toBe(true);
  });

  it("returns error if joinedDate is before dob", () => {
    const dob = "2000-01-01";
    const joined = "1999-12-31";
    expect(isJoinedDateAfterDOB(joined, dob)).toBe(
      "Joined Date must be on or after Date of Birth."
    );
  });

  it("returns error if joinedDate is in the future", () => {
    const futureDate = dayjs().add(1, "day").format(DATE_FORMATE);
    const dob = "2000-01-01";
    expect(isJoinedDateAfterDOB(futureDate, dob)).toBe(
      "Date cannot be in the future"
    );
  });

  it("returns error if joinedDate is invalid", () => {
    expect(isJoinedDateAfterDOB("invalid-date", "2000-01-01")).toBe(
      "Invalid date format"
    );
  });

  it("returns error if dob is invalid", () => {
    expect(isJoinedDateAfterDOB("2020-01-01", "invalid-dob")).toBe(
      "Invalid date format."
    );
  });

  it("returns true if either date is missing", () => {
    expect(isJoinedDateAfterDOB(null, "2000-01-01")).toBe(true);
    expect(isJoinedDateAfterDOB("2020-01-01", null)).toBe(true);
    expect(isJoinedDateAfterDOB(undefined, undefined)).toBe(true);
  });
});
