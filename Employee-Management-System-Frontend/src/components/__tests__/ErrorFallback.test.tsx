import { fireEvent, render, screen } from "@testing-library/react";
import ErrorFallback from "../ErrorFallback";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ErrorFallback", () => {
  it("should render component", () => {
    render(
      <BrowserRouter>
        <ErrorFallback error={null} />
      </BrowserRouter>
    );
    const button = screen.getByRole("button", { name: /Go Home/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
