import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
import axios from "axios";
import { headers } from "./headMenu";




// Fetch all departments
export const getAllDepartments = createAsyncThunk(
  "/site/alldepartment",
  async (_, { rejectWithValue }) => {
    try {
        const {data} = await instance.get(`/site/alldepartment`, {
            withCredentials: false,
            headers: headers
          });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch.");
    }
  }
);
