import { getSession } from "@/api/helpers/auth";
import LoginForm from "./(components)/LoginForm";
import { notFound } from "next/navigation";

const Login = async () => {
  const user = await getSession();

  if (user) {
    notFound();
  }
  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
