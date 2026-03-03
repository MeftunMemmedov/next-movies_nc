"use client";

import { useFormStatus } from "react-dom";
import { logoutAction } from "../../actions";

const LogoutBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="text-white bg-red-700 py-3 px-10 rounded-md font-semibold"
      disabled={pending}
    >
      Log out
    </button>
  );
};

const LogoutForm = () => {
  return (
    <form action={logoutAction} className="flex items-center">
      <LogoutBtn />
    </form>
  );
};

export default LogoutForm;
