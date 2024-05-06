import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin(setLoginError) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: userLogin,
    error,
    status: loginStatus,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueriesData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: (err) => {
      setLoginError(err);
      toast.error(err.message);
    },
  });

  return { userLogin, error, loginStatus };
}

export default useLogin;
