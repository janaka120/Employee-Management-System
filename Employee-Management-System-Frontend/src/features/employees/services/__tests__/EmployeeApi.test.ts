import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeDetails,
} from "../EmployeesApi";
import { API_BASE_URL } from "../../../../constants/EmployeeConstant";

vi.mock("axios");

const mockEmployees = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "1234567890",
    gender: "Male",
    dob: "1990-01-01",
    joinedDate: "2022-01-01",
  },
];

describe("Employee API Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAllEmployees should return formatted employee list on success", async () => {
    axios.get.mockResolvedValue({
      data: { status: "success", data: mockEmployees },
    });

    const result = await getAllEmployees();
    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/employees`);
  });

  it("addEmployee should return added employee on success", async () => {
    axios.post.mockResolvedValue({
      data: { status: "success", data: mockEmployees[0] },
    });

    const result = await addEmployee(mockEmployees[0]);
    expect(result).toEqual(mockEmployees[0]);
    expect(axios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/employees`,
      mockEmployees[0]
    );
  });

  it("updateEmployee should return updated employee on success", async () => {
    axios.put.mockResolvedValue({
      data: { status: "success", data: mockEmployees[0] },
    });

    const result = await updateEmployee({ id: "1", data: mockEmployees[0] });
    expect(result).toEqual(mockEmployees[0]);
    expect(axios.put).toHaveBeenCalledWith(
      `${API_BASE_URL}/employees/1`,
      mockEmployees[0]
    );
  });

  it("deleteEmployee should return deleted employee data on success", async () => {
    axios.delete.mockResolvedValue({
      data: { status: "success", data: mockEmployees[0] },
    });

    const result = await deleteEmployee("1");
    expect(result).toEqual(mockEmployees[0]);
    expect(axios.delete).toHaveBeenCalledWith(`${API_BASE_URL}/employees/1`);
  });

  it("getEmployeeDetails should return employee details on success", async () => {
    axios.get.mockResolvedValue({
      data: { status: "success", data: mockEmployees[0] },
    });

    const result = await getEmployeeDetails({ queryKey: ["employee", "1"] });
    expect(result).toEqual(mockEmployees[0]);
    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/employees/1`);
  });

  it("should throw error if id not provided to updateEmployee", async () => {
    await expect(
      updateEmployee({ id: "", data: mockEmployees[0] })
    ).rejects.toThrow("Something went wrong");
  });

  it("should throw error if id not provided to getEmployeeDetails", async () => {
    await expect(
      getEmployeeDetails({ queryKey: ["employee", undefined] })
    ).rejects.toThrow("Something went wrong");
  });
});
