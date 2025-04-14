import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainHeader from "../MainHeader";
import { PATHS } from "../../constants/Paths";

const renderWithRouter = () =>
  render(
    <BrowserRouter>
      <MainHeader />
    </BrowserRouter>
  );

describe("MainHeader", () => {
  it("renders the header with Home link", () => {
    renderWithRouter();

    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", PATHS.EMPLOYEE_LIST);
  });

  it("renders the HomeOutlined icon", () => {
    renderWithRouter();

    const icons = screen.getAllByRole("img", { hidden: true });
    expect(icons.length).toBe(2);
  });

  it("renders the Menu with correct default selected key", () => {
    renderWithRouter();

    const selectedItem = document.querySelector(".ant-menu-item-selected");
    expect(selectedItem).toBeTruthy();
    expect(selectedItem?.textContent?.toLowerCase()).toContain("home");
  });
});
