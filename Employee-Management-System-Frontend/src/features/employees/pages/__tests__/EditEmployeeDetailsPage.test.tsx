import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditEmployeeDetailsPage from "../editEmployee/EditEmployeeDetailsPage";
import { vi } from "vitest";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ employeeId: "123" }),
    useNavigate: () => vi.fn(),
  };
});

const mockEmployee = {
  uuid: "123",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  phone: "5555555555",
  gender: "Female",
  dob: "1990-01-01",
  joinedDate: "2021-01-01",
};

vi.mock("../../services/employeesApi", () => ({
  employeeDetailsQueryKey: (id: string) => ["employee", id],
  getEmployeeDetails: vi.fn(() => Promise.resolve(mockEmployee)),
  updateEmployee: vi.fn(() => Promise.resolve()),
}));

vi.mock("../../components/EmployeeForm", () => ({
  __esModule: true,
  default: ({ onSubmit, isSuccess, data }: any) => (
    <div data-testid="mock-employee-form">
      <button onClick={() => onSubmit(data)}>Submit</button>
      {isSuccess && <div data-testid="success-message">Success!</div>}
    </div>
  ),
}));

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

test("should render mock form and call onSubmit with selected employee data", async () => {
  renderWithClient(<EditEmployeeDetailsPage />);

  const form = await screen.findByTestId("mock-employee-form");
  expect(form).toBeInTheDocument();

  const submitBtn = screen.getByText("Submit");
  fireEvent.click(submitBtn);

  await waitFor(() => {
    expect(screen.getByTestId("success-message")).toBeInTheDocument();
  });
});
