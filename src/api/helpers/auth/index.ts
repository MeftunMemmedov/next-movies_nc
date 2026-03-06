import axiosAuthInstance from "@/api/auth";

import { cookies } from "next/headers";

export const signUp = async (
  email: string,
  password: string,
  metadata?: Record<string, string | boolean>
) => {
  const { data } = await axiosAuthInstance.post("signup", {
    email,
    password,
    data: metadata,
  });

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data } = await axiosAuthInstance.post("token?grant_type=password", { email, password });
  return data;
};

export const getUser = async (access_token: string) => {
  const { data } = await axiosAuthInstance.get("user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const getSession = async () => {
  const cookieStore = await cookies();

  const access_token = cookieStore.get("access")?.value;

  if (!access_token) return null;
  return await getUser(access_token);
};

export const logOut = async () => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access")?.value;
  try {
    await axiosAuthInstance.post(
      "logout",
      {},
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    cookieStore.delete("access");
    cookieStore.delete("refresh");
  } catch {
    throw "An error occured while logging out";
  }
};
