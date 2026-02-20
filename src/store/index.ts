import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data";
export const makeStore = () =>
  configureStore({
    reducer: { data: dataReducer },
  });

export type AppStore = ReturnType<typeof makeStore>;

export type Rootstate = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
