import { notFound } from "next/navigation";
import RegisterForm from "./(components)/RegisterForm";
import { getSession } from "@/api/helpers/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies | Sign Up",
};
const Register = async () => {
  const user = await getSession();

  if (user) {
    notFound();
  }
  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <RegisterForm />
      </div>
    </main>
  );
};

export default Register;
