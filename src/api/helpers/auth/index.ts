import axiosAuthInstance from "@/api/auth";
import { AxiosError } from "axios";
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

  const cookieStore = await cookies();

  cookieStore.set("access", data.access_token, { httpOnly: true, secure: true, path: "/" });
  cookieStore.set("refresh", data.refresh_token, { httpOnly: true, secure: true, path: "/" });

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
  const cookieStore = await cookies();

  const access_token = cookieStore.get("access")?.value;
  const refresh_token = cookieStore.get("refresh")?.value;

  if (!access_token) return null;
  try {
    return await getUser(access_token);
  } catch (err) {
    if (err instanceof AxiosError)
      if (err?.response?.status === 401 && refresh_token) {
        try {
          const refreshed = await getRefreshSession(refresh_token);
          return await getUser(refreshed.access_token);
        } catch {
          return null;
        }
      }
    return null;
  }
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
