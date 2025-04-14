import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { message } from "antd";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddEmployeeDetailsPage from "../addEmployee/AddEmployeeDetailsPage";
import * as employeesApi from "../../services/EmployeesApi";
import { EmployeeFromDataI } from "../../EmployeeTypes";

vi.mock("../../components/EmployeeForm", () => ({
  default: ({ onSubmit }: any) => (
    <div>
      <button onClick={() => onSubmit(mockFormData)}>Submit Form</button>
    </div>
  ),
}));

vi.mock("antd", async () => {
  const antd = await vi.importActual<typeof import("antd")>("antd");
  return {
    ...antd,
    message: {
      ...antd.message,
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

const mockFormData: EmployeeFromDataI = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "1234567890",
  gender: "Male",
  dob: "1990-01-01",
  joinedDate: "2023-01-01",
};

describe("AddEmployeeDetailsPage", () => {
  let queryClient: QueryClient;
  let invalidateSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    queryClient = new QueryClient();
    invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
  });

  const renderWithProvider = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <AddEmployeeDetailsPage />
      </QueryClientProvider>
    );

  it("should call mutate with form data and show success message", async () => {
    const user = userEvent.setup();

    const addEmployeeSpy = vi
      .spyOn(employeesApi, "addEmployee")
      .mockResolvedValue({});

    renderWithProvider();

    await user.click(screen.getByRole("button", { name: /submit form/i }));

    expect(addEmployeeSpy).toHaveBeenCalledWith(mockFormData);

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["employees"] });

    expect(message.success).toHaveBeenCalledWith(
      "Form data saved successfully!"
    );
  });

  it("should show error message on mutation error", async () => {
    const user = userEvent.setup();

    const error = new Error("Network Error");
    vi.spyOn(employeesApi, "addEmployee").mockImplementation(() => {
      throw error;
    });

    renderWithProvider();

    await user.click(screen.getByRole("button", { name: /submit form/i }));

    expect(message.error).toHaveBeenCalledWith(
      "Failed to save data: Network Error"
    );
  });
});
