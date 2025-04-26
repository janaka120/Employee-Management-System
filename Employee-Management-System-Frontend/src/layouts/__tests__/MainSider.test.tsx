import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainSider from "../MainSider";
import { PATHS } from "../../constants/Paths";
import { renderWithProviders } from "../../utils/test-provider-utils";

const renderWithRouter = () => renderWithProviders(<MainSider />);

describe("MainSider", () => {
  it("renders EMS header", () => {
    renderWithRouter();
    expect(screen.getByText(/EMS/i)).toBeInTheDocument();
  });

  it("renders Employee List and Add Employee links", () => {
    renderWithRouter();

    const listLink = screen.getByRole("link", { name: /employee list/i });
    const addLink = screen.getByRole("link", { name: /add employee/i });

    expect(listLink).toBeInTheDocument();
    expect(listLink).toHaveAttribute("href", PATHS.EMPLOYEE_LIST);

    expect(addLink).toBeInTheDocument();
    expect(addLink).toHaveAttribute("href", PATHS.ADD_EMPLOYEE_DETAIL);
  });

  it("collapses and expands when toggle is clicked", () => {
    renderWithRouter();

    const sider = document.querySelector(".ant-layout-sider")!;
    expect(sider).toHaveClass("ant-layout-sider-dark");

    expect(sider).toBeInTheDocument();
  });
});
