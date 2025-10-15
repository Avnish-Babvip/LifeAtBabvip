import { createSlice } from "@reduxjs/toolkit";
import {
  applicantLogin,
  applicantLogout,
  applicantRegister,
  changePassword,
  checkApplicantLogin,
  getProfileData,
  getProfilePhotoData,
  updateApplicantProfile,
  updateProfilePhotoDashboard,

} from "../actions/authentication";
import { toast } from "sonner";

const formattedDate = new Date().toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const initialState = {
  isLoading: false,
  isUserLoggedIn: false,
  errorMessage: "",
  userEmail: "",
  response: {},
  applicantData: {},
  profileData: {},
   isImageLoading: false,
   updateResponse:{},
   profilePhotoData:{}
};

// ---------------------------------------------------------------------------------------

const authenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.isUserLoggedIn = false;
    },
    storeUserEmail: (state, action) => {
      state.isUserLoggedIn = false;
      state.userEmail = action.payload;
    },
    resetErrorMessage: (state, action) => {
      state.errorMessage = "";
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
        state.isUserLoggedIn = true;
      })
      .addCase(checkApplicantLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = action.payload || "Failed to fetch ";
      })
      .addCase(applicantLogin.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(applicantLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.isUserLoggedIn = true;
        state.applicantData = action.payload.data;
        toast("Login Successfull.", {
          description: formattedDate,
        });
      })
      .addCase(applicantLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed to login API.";
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(getProfileData.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.profileData = action.payload.steps ;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed Profile API.";
      })
      .addCase(getProfilePhotoData.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getProfilePhotoData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.profilePhotoData = action.payload  ;
      })
      .addCase(getProfilePhotoData.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed Profile API.";
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        toast("Password Updated Successfully.", {
          description: formattedDate,
        });
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed to login API.";
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(applicantRegister.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(applicantRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        toast("Registration Successfull.", {
          description: formattedDate,
        });
      })
      .addCase(applicantRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed to register.";
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(updateApplicantProfile.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(updateApplicantProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        toast("Profile Updated Successfully.", {
          description: formattedDate,
        });
      })
      .addCase(updateApplicantProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed to register.";
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(applicantLogout.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(applicantLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.isUserLoggedIn = false;
        state.applicantData = {};
        toast("Log out Successfull.", {
          description: formattedDate,
        });
      })
      .addCase(applicantLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed to logout API.";
        toast("Logout failed. Please try again", {
          description: formattedDate,
        });
      })
         .addCase(updateProfilePhotoDashboard.pending, (state) => {
        state.isImageLoading = true;
        state.errorMessage = "";
      })
      .addCase(updateProfilePhotoDashboard.fulfilled, (state, action) => {
        state.isImageLoading = false;
        state.errorMessage = "";
        state.updateResponse= action.payload
        toast("Profile photo updated successfully.", {
                    description: formattedDate,
                  });
        
      })
      .addCase(updateProfilePhotoDashboard.rejected, (state, action) => {
        state.isImageLoading = false;
        state.errorMessage = action.payload;
        toast(action.payload, {
                    description: formattedDate,
                  });

      })
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const { resetUserState, storeUserEmail, resetErrorMessage } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
