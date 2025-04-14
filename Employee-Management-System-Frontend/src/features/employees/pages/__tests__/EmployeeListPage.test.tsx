import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import EmployeeListPage from "../employeeList/EmployeeListPage";
import { useAppDispatch, useAppSelector } from "../../../../store/store-hooks";
import * as api from "../../services/EmployeesApi";
import { EmployeeI, GenderType } from "../../EmployeeTypes";

vi.mock("../../../../store/store-hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock("antd", async () => {
  const antd = await vi.importActual("antd");
  return {
    ...antd,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

vi.mock("../employeeList/components/EmployeesTable", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-table">Mocked EmployeesTable</div>,
}));

const mockDispatch = vi.fn();

describe("EmployeeListPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as any).mockReturnValue(mockDispatch);
  });

  const renderWithProviders = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <EmployeeListPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  it("shows loading state", async () => {
    vi.spyOn(api, "getAllEmployees").mockReturnValue(new Promise(() => {}));
    (useAppSelector as any).mockReturnValue([]);

    renderWithProviders();
    expect(await screen.findByText(/loading employees/i)).toBeInTheDocument();
  });

  it("shows error message on failure", async () => {
    vi.spyOn(api, "getAllEmployees").mockRejectedValue(
      new Error("Fetch failed")
    );
    (useAppSelector as any).mockReturnValue([]);

    renderWithProviders();

    await screen.findByText(/error loading employees/i);
    expect(screen.getByText("Fetch failed")).toBeInTheDocument();
  });

  it("renders EmployeesTable with fetched employees", async () => {
    const employees: EmployeeI[] = [
      {
        uuid: "1",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        phone: "1234567890",
        gender: "Female" as GenderType,
        dob: "1990-01-01",
        joinedDate: "2022-01-01",
      },
    ];

    vi.spyOn(api, "getAllEmployees").mockResolvedValue(employees);
    (useAppSelector as any).mockReturnValue(employees);

    renderWithProviders();

    expect(await screen.findByText("Employee List Page")).toBeInTheDocument();
    expect(await screen.findByTestId("mock-table")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "employee/setEmployeeList",
        payload: employees,
      });
    });
  });
});
