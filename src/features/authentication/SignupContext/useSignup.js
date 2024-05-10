import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const {
    mutate: signupUser,
    status: signupStatus,
    error: signupError,
  } = useMutation({
    mutationFn: (user) => signup(user),

    onSuccess: (data) => {
      console.log(data);
      toast.success(
        `Account successfully created. Please verify the account from ${data?.user.email}`
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signupUser, signupStatus, signupError };
}

export default useSignup;
