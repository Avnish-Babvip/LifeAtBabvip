import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
import axios from "axios";
import { headers } from "./headMenu";




// Fetch six jobs
export const getLatestSixJobs = createAsyncThunk(
  "site/latestsixjobs",
  async (_, { rejectWithValue }) => {
    try {
        const {data} = await instance.get(`/site/latestsixjobs`, {
            withCredentials: false,
            headers: headers
          });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch jobs.");
    }
  }
);


export const getPaginateJobs = createAsyncThunk(
  "/site/alljobs",
  async ({url,payload}, { rejectWithValue }) => {
    try {
        const {data} = await axios.get(`${url}&title=${payload.title}&location_id=${payload.locationId}&type=${payload.type}`, {
            withCredentials: false,
            headers: headers
          });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch blogs.");
    }
  }
);


// Fetch jobs by slug
export const getDetailJobBySlug = createAsyncThunk(
  "/site/jobdetail/",
  async (slug, { rejectWithValue }) => {
    try {
        const {data} = await instance.get(`/site/jobdetail/${slug}`, {
            withCredentials: false,
            headers: headers
          });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch jobs.");
    }
  }
);


export const getJobLocations = createAsyncThunk(
  "/site/alllocationsdata/",
  async (_, { rejectWithValue }) => {
    try {
        const {data} = await instance.get(`/site/alllocationsdata`, {
            withCredentials: false,
            headers: headers
          });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch.");
    }
  }
);

