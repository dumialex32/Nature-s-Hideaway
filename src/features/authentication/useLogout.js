import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: userLogout,
    status: logoutStatus,
    error: logoutError,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login", { replace: true });
    },

    onError: (err) => console.error(err.message),
  });

  return { userLogout, logoutStatus, logoutError };
}

export default useLogout;
