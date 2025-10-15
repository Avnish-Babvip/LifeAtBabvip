import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
import { headers } from "./headMenu";

const getCsrfToken = async () => {
  const response = await instance.get("/site/csrf-token", {
    headers: headers,
  });
  return response.data.csrf_token;
};

// Fetch portfolio details by slug
export const checkApplicantLogin = createAsyncThunk(
  "/site/checkloginapplicant",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `/site/checkloginapplicant?email=${email}`,
        {
          withCredentials: false,
          headers: headers,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch ."
      );
    }
  }
);

export const applicantLogin = createAsyncThunk(
  "/applicant/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(
        `/applicant/login`,
        { ...payload, _token: await getCsrfToken() },
        {
          withCredentials: false,
          headers: headers,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to post applicant login"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "update-password",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(
        `/applicant/update-password`,
        { ...payload, _token: await getCsrfToken() },
        {
          withCredentials: false,
          headers: headers,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data.message || "Failed to post update password"
      );
    }
  }
);

export const applicantRegister = createAsyncThunk(
  "/applicant/register",
  async (payload, { rejectWithValue }) => {
    try {
      
      const { data } = await instance.post(
        `/applicant/register`,
        payload,
        {
          withCredentials: false,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to post applicant registeration"
      );
    }
  }
);

export const applicantLogout = createAsyncThunk(
  "applicantLogout",
  async (loginToken, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/applicant/logout`, {
        withCredentials: false,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${loginToken}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to logout applicant "
      );
    }
  }
);

export const getProfileData = createAsyncThunk(
  "/applicant/editprofileapi",
  async (loginToken, { rejectWithValue }) => {
    console.log(loginToken)
    try {
      
      const { data } = await instance.get(
        `/applicant/editprofileapi`,
        {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    }
  }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to get profile"
      );
    }
  }
);

export const updateApplicantProfile = createAsyncThunk(
  "/applicant/update-step",
  async ({ payload, step, loginToken }, { rejectWithValue }) => {
    try {
      let data;

      if (!step) {
        const response = await instance.post(
          `/applicant/update-step`,
          payload ,
          {
            headers: {
              Authorization: `Bearer ${loginToken}`,
                "Content-Type": "multipart/form-data",
            },
          }
        );
        data = response.data;
      } else {
        const response = await instance.post(
          `/applicant/update-step`,
          { ...payload, step },
          {
            headers: {
              Authorization: `Bearer ${loginToken}`,
            },
          }
        );
        data = response.data;
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to post applicant profile details"
      );
    }
  }
);

export const updateProfilePhotoDashboard = createAsyncThunk(
    "/applicant/updateprofilephoto",
    async ({payload,loginToken}, { rejectWithValue }) => {
      payload.append("_token", await getCsrfToken())
      try {
          const {data} = await instance.post(`/applicant/profile-imageupdate`, payload, {
              withCredentials: false,
              headers: {
                Authorization: `Bearer ${loginToken}`,
              }
            });
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const getProfilePhotoData = createAsyncThunk(
  "/applicant/profile-image",
  async (loginToken, { rejectWithValue }) => {
    try {    
      const { data } = await instance.get(
        `/applicant/profile-image`,
        {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    }
  }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to get profile photo"
      );
    }
  }
);




