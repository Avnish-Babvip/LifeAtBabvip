import { createSlice } from "@reduxjs/toolkit";
import { getAllDepartments } from "../actions/department";


const initialState = {
  isLoading: false,
  departmentData: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

 const departmentSlice = createSlice({
  name: "departmentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
   
      .addCase(getAllDepartments.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getAllDepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.departmentData = action.payload.data; 
      })
      .addCase(getAllDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Failed to fetch department data.";
      })
  

  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = departmentSlice.actions;
export default departmentSlice.reducer;