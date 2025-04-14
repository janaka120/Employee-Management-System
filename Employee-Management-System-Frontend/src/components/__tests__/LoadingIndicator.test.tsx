import { render, screen } from "@testing-library/react";
import LoadingIndicator from "../LoadingIndicator";

describe("LoadingIndicator", () => {
  it("should render component", () => {
    render(<LoadingIndicator text="sample loading text" />);
    expect(screen.getByText("sample loading text")).toBeInTheDocument();
  });
});
