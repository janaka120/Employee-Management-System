import { renderHook } from "@testing-library/react";
import usePageChangeListerHook from "../usePageChangeListerHook";

describe("usePageChangeListerHook", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("adds beforeunload event listener when isChanged is true", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => usePageChangeListerHook(true));

    expect(addSpy).toHaveBeenCalledWith("beforeunload", expect.any(Function), {
      capture: true,
    });

    unmount();

    expect(removeSpy).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function)
    );
  });

  it("does not add listener when isChanged is false", () => {
    const addSpy = vi.spyOn(window, "addEventListener");

    renderHook(() => usePageChangeListerHook(false));

    expect(addSpy).not.toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function)
    );
  });
});
