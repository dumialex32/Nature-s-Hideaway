import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllData } from "../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteAllDataHook() {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteAll, status: mutateDeleteAllStatus } =
    useMutation({
      mutationFn: deleteAllData,
      onSuccess: () => {
        queryClient.invalidateQueries(["cabins", "guests", "bookings"]);
        toast.success(
          "All data, including bookings, cabins and users has been deleted"
        );
      },
      onError: (error) => toast.error(error.message),
    });

  return { mutateDeleteAll, mutateDeleteAllStatus };
}

export default useDeleteAllDataHook;
