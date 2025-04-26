// test-utils.tsx
import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import employeeReducer from "../features/employees/EmployeeSlice";
import type { RootState } from "../store";

interface ExtendedRenderOptions {
  preloadedState?: Partial<RootState>;
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, route = "/" }: ExtendedRenderOptions = {}
) {
  const store = configureStore({
    reducer: {
      employee: employeeReducer,
    },
    preloadedState: preloadedState as RootState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );
}
