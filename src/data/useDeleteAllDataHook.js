import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllData } from "../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteAllDataHook() {
  const queryClient = useQueryClient();

  const { mutate: deleteAll, isLoading: isLoadingDeleteAll } = useMutation({
    mutationFn: deleteAllData,
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins", "guests", "bookings"]);
      toast.success("All cabins were deleted");
    },
    onError: (error) => toast.error(error.message),
  });

  return { deleteAll, isLoadingDeleteAll };
}

export default useDeleteAllDataHook;
