import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../utils/test-provider-utils";
import ChangeWarningDialog from "../ChangeWarningDialog";

describe("ChangeWarningDialog test", () => {
  it("should not display dialog initial load", () => {
    renderWithProviders(<ChangeWarningDialog />);
    expect(screen.queryByTestId("change-warning-dialog")).toBeNull();
  });

  it("should display dialog when state update", () => {
    renderWithProviders(<ChangeWarningDialog />, {
      preloadedState: {
        employee: {
          isShowFormChangeAlert: true,
          selectedRoute: "/home",
          isEmployeeFormDirty: true,
          employeeList: [],
        },
      },
    });
    expect(screen.queryByTestId("change-warning-dialog")).not.toBeNull();
    expect(screen.getByText("OK")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Form has been modified")).toBeInTheDocument();
    expect(
      screen.getByText(
        "You will lose your unsaved changes. Are you sure you want to close this form?"
      )
    ).toBeInTheDocument();
  });

  it("should close dialog when press on OK button", async () => {
    renderWithProviders(<ChangeWarningDialog />, {
      preloadedState: {
        employee: {
          isShowFormChangeAlert: true,
          selectedRoute: "/home",
          isEmployeeFormDirty: true,
          employeeList: [],
        },
      },
    });
    expect(screen.queryByTestId("change-warning-dialog")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /ok/i }));
  });
});
