import { createSlice } from "@reduxjs/toolkit";
import { checkApplicantLogin } from "../actions/authentication";
import { Navigate } from "react-router-dom";

const initialState = {
  isLoading: false,
  isUserLoggedIn:false,
  errorMessage: "",
  userEmail: "",
  response:{}
};

// ---------------------------------------------------------------------------------------

const authenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState,
  reducers: {
      resetUserState: (state) => {
      state.isUserLoggedIn = false;
    },
      storeUserEmail: (state,action) => {
      state.isUserLoggedIn = false;
      state.userEmail = action.payload
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(checkApplicantLogin.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(checkApplicantLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.response = action.payload;
        state.isUserLoggedIn=true
    
      })
      .addCase(checkApplicantLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isUserLoggedIn=false
        state.errorMessage =
          action.payload || "Failed to fetch ";
      })
      // .addCase(userLogout.pending, (state) => {
      //   state.isLoading = true;
      //   state.errorMessage = "";
      // })
      // .addCase(userLogout.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.errorMessage = "";
      //   state.isUserLoggedIn = false;
      //   state.userData= {}
      //   toast("Log out Successfull.", {
      //       description: formattedDate,
      //     });

      // })
      // .addCase(userLogout.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.errorMessage = action.payload || "Failed to logout API.";
      //   toast("Logout failed. Please try again", {
      //       description: formattedDate,
      //     });
      // })

  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {resetUserState,storeUserEmail} = authenticationSlice.actions;
export default authenticationSlice.reducer;
