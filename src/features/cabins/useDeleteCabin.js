import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteCabin, status: mutateDeleteStatus } = useMutation(
    {
      mutationFn: deleteCabin,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
        toast.success("Cabin succesfully deleted");
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { mutateDeleteCabin, mutateDeleteStatus };
}

export default useDeleteCabin;
