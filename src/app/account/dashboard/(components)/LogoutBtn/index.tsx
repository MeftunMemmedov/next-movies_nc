"use client";

import { useFormStatus } from "react-dom";
import { logoutAction } from "../../actions";
import { clearUser } from "@/store/user";
import { useAppDispatch } from "@/store/hooks";

const LogoutBtn = () => {
  const dispatch = useAppDispatch();
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="text-white bg-red-700 py-3 px-10 rounded-md font-semibold"
      disabled={pending}
      onClick={() => dispatch(clearUser())}
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
