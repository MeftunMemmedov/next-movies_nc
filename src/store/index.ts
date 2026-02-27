import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data";
import userReducer from "./user";
export const makeStore = () =>
  configureStore({
    reducer: { data: dataReducer, user: userReducer },
  });

export type AppStore = ReturnType<typeof makeStore>;

export type Rootstate = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
