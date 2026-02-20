import { Status } from "@/types";

export const INITIALSTATUS: Status = {
  loading: false,
  success: false,
  failure: false,
};

export const LOADING: Status = {
  loading: true,
  success: false,
  failure: false,
};

export const SUCCESS: Status = {
  loading: false,
  success: true,
  failure: false,
};

export const FAILURE: Status = {
  loading: false,
  success: false,
  failure: true,
};
