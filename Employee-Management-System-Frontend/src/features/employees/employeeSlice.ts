import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { EmployeeI } from "./employeeTypes";

interface EmployeeState {
  employeeList: EmployeeI[];
}

const initialState: EmployeeState = {
  employeeList: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeList: (state, action: PayloadAction<EmployeeI[]>) => {
      state.employeeList = action.payload;
    },
  },
});

export const { setEmployeeList } = employeeSlice.actions;

export const selectEmployeeList = (state: RootState) =>
  state.employee.employeeList;

export default employeeSlice.reducer;
