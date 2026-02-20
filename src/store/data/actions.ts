import { getDataList } from "@/api/helpers";
import { Genre } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getGenreList = createAsyncThunk("data/getGenreList", async (_, thunkAPI) => {
  try {
    const res = await getDataList<Genre>("mov_genres");

    return res;
  } catch (error) {
    const err = error as AxiosError;
    throw thunkAPI.rejectWithValue(err.response?.data);
  }
});
