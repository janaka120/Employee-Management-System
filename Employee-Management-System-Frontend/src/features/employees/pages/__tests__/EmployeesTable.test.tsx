import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmployeesTable from "../employeeList/components/EmployeesTable";
import { BrowserRouter } from "react-router-dom";
import { EmployeeI, GenderType } from "../../EmployeeTypes";

const mockEmployees: EmployeeI[] = [
  {
    uuid: "1",
    firstName: "firstName1",
    lastName: "lastName1",
    email: "firstName1@example.com",
    phone: "1234567890",
    gender: "Female" as GenderType,
    dob: "1990-01-01",
    joinedDate: "2022-01-01",
  },
  {
    uuid: "2",
    firstName: "firstName2",
    lastName: "lastName2",
    email: "firstName2@example.com",
    phone: "9876543210",
    gender: "Male" as GenderType,
    dob: "1985-06-15",
    joinedDate: "2021-09-15",
  },
];

const renderComponent = (list = mockEmployees, deleteHandler = vi.fn()) => {
  return render(
    <BrowserRouter>
      <EmployeesTable list={list} deleteHandler={deleteHandler} />
    </BrowserRouter>
  );
};

describe("EmployeesTable", () => {
  it("renders table with employee data", async () => {
    renderComponent();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Date of Birth")).toBeInTheDocument();
    expect(screen.getByText("Joined Date")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();

    expect(screen.getByText("firstName1")).toBeInTheDocument();
    expect(screen.getByText("lastName1")).toBeInTheDocument();
    expect(screen.getByText("firstName1@example.com")).toBeInTheDocument();
    expect(screen.getByText("firstName2")).toBeInTheDocument();
    expect(screen.getByText("lastName2")).toBeInTheDocument();
    expect(screen.getByText("firstName2@example.com")).toBeInTheDocument();
  });

  it("renders Edit and Delete buttons", () => {
    renderComponent();

    const editButtons = screen.getAllByRole("button", { name: /edit user/i });
    const deleteButtons = screen.getAllByRole("button", {
      name: /delete user/i,
    });

    expect(editButtons.length).toBe(2);
    expect(deleteButtons.length).toBe(2);
  });

  it("calls deleteHandler when Delete is confirmed", async () => {
    const deleteHandler = vi.fn();
    renderComponent(mockEmployees, deleteHandler);

    const user = userEvent.setup();
    const deleteButton = screen.getByRole("button", {
      name: /delete user firstName1 lastName1/i,
    });

    await user.click(deleteButton);

    const confirmDialog = await screen.findByText(/are you sure/i);
    const closestBtn = confirmDialog.closest(".ant-popover");
    if (closestBtn) {
      const yesButton = within(closestBtn as HTMLElement).getByText("Yes");
      await user.click(yesButton);

      expect(deleteHandler).toHaveBeenCalledWith("1");
    }
  });
});
