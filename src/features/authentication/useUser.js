import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  console.log(isLoadingUser);
  console.log(user);

  return {
    user,
    isLoadingUser,
    userError,
    isAuthenticated: user?.role === "authenticated",
  };
}

export default useUser;
