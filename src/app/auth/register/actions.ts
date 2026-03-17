"use server";
import { createNewData } from "@/api/helpers";
import { signUp } from "@/api/helpers/auth";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export type ActionState = {
  errors: {
    email: string | null;
    username: string | null;
    password: string | null;
    details: string | null;
  };
};

const initialErrorState = {
  email: null,
  username: null,
  password: null,
  details: null,
};

export const registerAction = async (_prevState: ActionState, formData: FormData) => {
  const email = (formData.get("email") as string).trim();
  const password = (formData.get("password") as string).trim();
  const username = (formData.get("username") as string).trim();

  const errors: ActionState["errors"] = { ...initialErrorState };
  if (username.length < 5) errors.username = "Username must be at least 5 chars";

  if (password.length < 6) errors.password = "Password must be at least 6 chars";

  const hasError = Object.values(errors).some(Boolean);
  if (hasError) {
    return { errors };
  }

  try {
    const res = await signUp(email, password, { username });
    const userId = res.id;
    const uname = res.user_metadata.username;
    const e_mail = res.user_metadata.email;
    await createNewData("profiles", { id: userId, userName: uname, email: e_mail });
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

  redirect("/auth/login");
};
