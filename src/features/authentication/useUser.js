import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const {
    data: currentUser,
    isLoading: isLoadingCurrentUser,
    error: currentUserError,
  } = useQuery({
    queryKey: ["role"],
    queryFn: getCurrentUser,
  });

  console.log(isLoadingCurrentUser);

  return {
    currentUser,
    isLoadingCurrentUser,
    currentUserError,
    isAuthenticated: currentUser?.role === "authenticated",
  };
}

export default useUser;
