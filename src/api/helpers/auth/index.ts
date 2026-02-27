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

export const getRefreshSession = async (refresh_token: string) => {
  const { data } = await axiosAuthInstance.post("token?grant_type=refresh_token", {
    refresh_token,
  });

  return data;
};

export const getUser = async (access_token: string) => {
  const { data } = await axiosAuthInstance.get("user", {
    params: {
      select: "id,user_metadata",
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const getSession = async () => {
  const token = (await cookies()).get("access")?.value;

  if (!token) return null;

  try {
    return await getUser(token);
  } catch (error) {
    return null;
  }
};

export const logOut = async (access_token: string) => {
  await axiosAuthInstance.post(
    "logout",
    {},
    { headers: { Authorization: `Bearer ${access_token}` } }
  );
};
