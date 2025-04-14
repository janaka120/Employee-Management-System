import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EmployeeForm from "../EmployeeForm";
import { vi } from "vitest";
import { EmployeeI } from "../../EmployeeTypes";

const mockSubmit = vi.fn();

const mockEmployee: EmployeeI = {
  uuid: "uuid-1",
  firstName: "FirstName",
  lastName: "LastName",
  email: "test.mail@example.com",
  phone: "91444444",
  gender: "Male",
  dob: "1999-12-12",
  joinedDate: "2025-03-01",
};

describe("EmployeeForm component", () => {
  beforeEach(() => {
    render(<EmployeeForm onSubmit={mockSubmit} isSuccess={false} />);
  });

  it("should renders all the form fields", () => {
    expect(screen.getByText(/Add New Employee/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter first name/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter last name/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter email address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter phone number/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Male")).toBeInTheDocument();
    expect(screen.getByLabelText("Female")).toBeInTheDocument();
    expect(screen.getByLabelText("Other")).toBeInTheDocument();

    expect(screen.getByText(/add employee/i)).toBeInTheDocument();
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });

  it("submits form with enter valid input", async () => {
    fireEvent.input(screen.getByPlaceholderText(/Enter first name/i), {
      target: { value: "FirstName" },
    });

    fireEvent.input(screen.getByPlaceholderText(/Enter last name/i), {
      target: { value: "LastName" },
    });

    fireEvent.input(screen.getByPlaceholderText(/Enter email address/i), {
      target: { value: "test.mail@example.com" },
    });

    fireEvent.input(screen.getByPlaceholderText(/Enter phone number/i), {
      target: { value: "91444444" },
    });

    fireEvent.click(screen.getByLabelText("Male"));

    const dobWrapper = screen
      .getByText(/date of birth/i)
      .closest(".ant-form-item");
    const dobInput = dobWrapper?.querySelector("input");

    expect(dobInput).toBeInTheDocument();

    const joinedDateWrapper = screen
      .getByText(/date of birth/i)
      .closest(".ant-form-item");
    const joinedDateInput = joinedDateWrapper?.querySelector("input");

    expect(joinedDateInput).toBeInTheDocument();

    if (dobInput) {
      userEvent.clear(dobInput);
      userEvent.type(dobInput, "1990-01-01");
    }
    if (joinedDateInput) {
      userEvent.clear(joinedDateInput);
      userEvent.type(joinedDateInput, "2025-01-01");
    }

    fireEvent.click(screen.getByRole("button", { name: /add employee/i }));

    expect(
      screen.getByRole("button", { name: /add employee/i })
    ).toBeInTheDocument();
  });

  it("validate all the fields", async () => {
    fireEvent.input(screen.getByPlaceholderText("Enter first name"), {
      target: { value: "name" },
    });

    const addEmployeeBtn = screen.getByRole("button", {
      name: /add employee/i,
    });
    expect(addEmployeeBtn).toBeInTheDocument();
    fireEvent.click(addEmployeeBtn);
    await waitFor(() => {
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a gender/i)).toBeInTheDocument();
      expect(
        screen.getByText(/date of birth is required/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/joined date is required/i)).toBeInTheDocument();
    });
  });

  it("should pre-fill form with existing employee data", () => {
    render(
      <EmployeeForm onSubmit={vi.fn()} isSuccess={false} data={mockEmployee} />
    );

    expect(screen.getByDisplayValue("FirstName")).toBeInTheDocument();
    expect(screen.getByDisplayValue("LastName")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("test.mail@example.com")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("91444444")).toBeInTheDocument();

    expect(screen.getByDisplayValue("1999-12-12")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2025-03-01")).toBeInTheDocument();
  });

  it("should submit form with pre-filled data", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    render(
      <EmployeeForm
        onSubmit={mockSubmit}
        isSuccess={false}
        data={{ ...mockEmployee, firstName: "" }}
      />
    );

    fireEvent.input(screen.getAllByPlaceholderText("Enter first name")[1], {
      target: { value: "FirstName" },
    });

    const submitBtn = screen.getByRole("button", { name: /update employee/i });
    await user.click(submitBtn);

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "FirstName",
        lastName: "LastName",
        email: "test.mail@example.com",
        phone: "91444444",
        gender: "Male",
        dob: "1999-12-12",
        joinedDate: "2025-03-01",
      }),
      expect.anything()
    );
  });
});
