import { createSlice } from "@reduxjs/toolkit";
import { getDetailJobBySlug, getJobLocations, getLatestSixJobs, getPaginateJobs, } from "../actions/career";


const initialState = {
  isLoading: false,
  jobData: [],
  latestJobData: [],
  detailJobData:{},
  errorMessage: "",
  jobLocations:[]
};

// ---------------------------------------------------------------------------------------

 const careerSlice = createSlice({
  name: "careerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
   
      .addCase(getLatestSixJobs.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getLatestSixJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.latestJobData = action.payload.data; 
      })
      .addCase(getLatestSixJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Failed to fetch job data.";
      })
      .addCase(getPaginateJobs.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getPaginateJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.jobData = action.payload.data; 
      })
      .addCase(getPaginateJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Failed to fetch job data.";
      })
      .addCase(getDetailJobBySlug.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getDetailJobBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.detailJobData = action.payload; 
      })
      .addCase(getDetailJobBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Failed to fetch .";
      })
      .addCase(getJobLocations.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getJobLocations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        
        state.jobLocations = action.payload.data; 
      })
      .addCase(getJobLocations.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Failed to fetch .";
      })

  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = careerSlice.actions;
export default careerSlice.reducer;