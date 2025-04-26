import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { EmployeeI } from "./EmployeeTypes";
import { To } from "react-router-dom";

export interface EmployeeState {
  employeeList: EmployeeI[];
  isEmployeeFormDirty: boolean;
  isShowFormChangeAlert: boolean;
  selectedRoute: To | null;
}

const initialState: EmployeeState = {
  employeeList: [],
  isEmployeeFormDirty: false,
  isShowFormChangeAlert: false,
  selectedRoute: null,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeList: (state, action: PayloadAction<EmployeeI[]>) => {
      state.employeeList = action.payload;
    },
    setIsEmployeeFormDirty: (state, action: PayloadAction<boolean>) => {
      state.isEmployeeFormDirty = action.payload;
    },
    setIsShowFormChangeAlert: (state, action: PayloadAction<boolean>) => {
      state.isShowFormChangeAlert = action.payload;
    },
    setSelectedRoute: (state, action: PayloadAction<To>) => {
      state.selectedRoute = action.payload;
    },
  },
});

export const {
  setEmployeeList,
  setIsEmployeeFormDirty,
  setIsShowFormChangeAlert,
  setSelectedRoute,
} = employeeSlice.actions;

export const selectEmployeeList = (state: RootState) =>
  state.employee.employeeList;

export const selectIsEmployeeFormDirty = (state: RootState) =>
  state.employee.isEmployeeFormDirty;

export const selectIsShowFormChangeAlert = (state: RootState) =>
  state.employee.isShowFormChangeAlert;

export const selectSelectedRoute = (state: RootState) =>
  state.employee.selectedRoute;

export default employeeSlice.reducer;
