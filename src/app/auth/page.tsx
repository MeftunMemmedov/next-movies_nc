import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Auth",
};

const page = () => {
  redirect("/auth/login");
};

export default page;
