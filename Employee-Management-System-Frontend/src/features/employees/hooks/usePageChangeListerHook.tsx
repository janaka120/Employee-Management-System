import { useEffect } from "react";

const usePageChangeListerHook = (isChanged: boolean) => {
  useEffect(() => {
    if (!isChanged) return;

    function handleOnBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = "");
    }
    window.addEventListener("beforeunload", handleOnBeforeUnload, {
      capture: true,
    });

    return () => {
      window.removeEventListener("beforeunload", handleOnBeforeUnload);
    };
  }, [isChanged]);
};

export default usePageChangeListerHook;
