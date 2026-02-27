"use server";

import { signIn } from "@/api/helpers/auth";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type ActionState = {
  errors: {
    email: string | null;
    password: string | null;
    details: string | null;
  };
};

const initialErrorState = {
  email: null,
  password: null,
  details: null,
};

export const loginAction = async (_prevState: ActionState, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: ActionState["errors"] = { ...initialErrorState };

  if (password.length < 6) errors.password = "Password must be at least 6 chars";

  const hasError = Object.values(errors).some(Boolean);
  if (hasError) {
    return { errors };
  }
  try {
    const res = await signIn(email, password);

    const cookieStore = await cookies();

    cookieStore.set("access", res.access_token, { httpOnly: true, secure: true, path: "/" });
    cookieStore.set("refresh", res.refresh_token, { httpOnly: true, secure: true, path: "/" });
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        errors: {
          ...errors,
          details: error.response?.data.msg || "ERROR",
        },
      };
    }
    return {
      errors: {
        ...errors,
        details: "Unexpected error",
      },
    };
  }
  redirect("/");
};
