import { INITIALSTATUS, LOADING, SUCCESS } from "@/constants/status";
import { Genre, Status } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { getGenreList } from "./actions";

interface StateProps {
  genres: Genre[] | null;
  status: {
    genre: Status;
  };
  //   errors:
}

const initialState: StateProps = {
  genres: null,
  status: {
    genre: INITIALSTATUS,
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGenreList.pending, (state) => {
        state.status.genre = { ...LOADING };
      })
      .addCase(getGenreList.fulfilled, (state, { payload }) => {
        state.genres = payload;
        state.status.genre = { ...SUCCESS };
      });
  },
});

export default dataSlice.reducer;
