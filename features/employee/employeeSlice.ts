import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "./employeeInterface";

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },

    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },

    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );

      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },

    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },

    setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.selectedEmployee = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    resetEmployeeState: (state) => {
      state.employees = [];
      state.selectedEmployee = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setSelectedEmployee,
  setLoading,
  setError,
  resetEmployeeState,
} = employeeSlice.actions;

export default employeeSlice.reducer;