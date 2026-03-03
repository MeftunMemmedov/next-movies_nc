"use client";
import { useActionState } from "react";
import { ActionState, loginAction } from "../../actions";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

const initialState = { errors: { email: null, password: null, details: null } };

const LoginForm = () => {
  const formInputs = [
    { name: "email", type: "email" },
    { name: "password", type: "password" },
  ];
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  return (
    <form action={formAction} className="px-20 py-15 bg-secondary-black rounded-2xl">
      <h3 className="text-white text-4xl font-bold mb-8">Sign In</h3>
      {state.errors.details && (
        <div className="bg-red-950 py-2 rounded-md mb-4" role="alert">
          <p className="text-red-500 text-center">{state.errors.details}</p>
        </div>
      )}
      <div>
        {formInputs.map((input, index) => (
          <div key={`login-input-${index}`} className="mb-5">
            <input
              type={input.type}
              name={input.name}
              disabled={isPending}
              placeholder={`Enter your ${input.name}`}
              className="bg-gray-400 w-80 h-10 rounded-md block text-black focus:outline-0 px-5 placeholder:text-black placeholder:font-bold"
            />
            {state.errors[input.name as keyof ActionState["errors"]] && (
              <p className="text-red-500">
                {state.errors[input.name as keyof ActionState["errors"]]}
              </p>
            )}
          </div>
        ))}
        <button
          disabled={isPending}
          type="submit"
          className="px-10 py-3 bg-main-red rounded-md font-bold text-white"
        >
          {isPending ? (
            <div className="text-main-red">
              <LoadingSpinner />
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
      <p className="text-white mt-5">
        No account?{" "}
        <Link href="/auth/register" className="text-main-red">
          Sign in
        </Link>
        now
      </p>
    </form>
  );
};

export default LoginForm;
