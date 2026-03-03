"use server";

import { logOut } from "@/api/helpers/auth";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
  try {
    await logOut();
    redirect("/");
  } catch (error) {
    throw error;
  }
};
