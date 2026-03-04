import { INITIALSTATUS } from "@/constants/status";
import { Status, User, WatchListMov } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface StateProps {
  user: User | null;
  watchlist: WatchListMov[] | null;
  status: {
    watchlist: Status;
  };
}

const initialState: StateProps = {
  user: null,
  watchlist: null,
  status: {
    watchlist: { ...INITIALSTATUS },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setWatchlist, clearUser } = userSlice.actions;
export default userSlice.reducer;
