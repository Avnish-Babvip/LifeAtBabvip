import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
import { headers } from "./headMenu";

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
// export const userLogout = createAsyncThunk(
//   "userLogout",
//   async (loginToken, { rejectWithValue }) => {
//     try {
//       const { data } = await instance.get(`/customer/logout`, {
//         withCredentials: false,
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${loginToken}`,
//         },
//       });
//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response.data.message || "Failed to logout user "
//       );
//     }
//   }
// );
