"use server";
import { createNewData, deleteData } from "@/api/helpers";
import { revalidatePath } from "next/cache";

export const addToWatchlist = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const movieId = formData.get("movieId") as string;
  const pathname = formData.get("pathname") as string;
  try {
    await createNewData("mov_watchlist", { userId, movieId });
  } catch (error) {
    console.log(error);
  }
  revalidatePath(pathname);
};

export const removeFromWatchlist = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const movieId = formData.get("movieId") as string;
  const pathname = formData.get("pathname") as string;

  try {
    await deleteData("mov_watchlist", { userId: `eq.${userId}`, movieId: `eq.${movieId}` });
  } catch (error) {
    console.log(error);
  }
  revalidatePath(pathname);
};
