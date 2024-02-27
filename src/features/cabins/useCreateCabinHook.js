import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin(editSession) {
  const queryClient = useQueryClient();

  const { mutate: mutateCreateEditCabin, status: mutateCreateEditStatus } =
    useMutation({
      mutationFn: createEditCabin,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
        toast.success(
          `${
            editSession
              ? "Cabin was succesfully created"
              : "Edit was succesfully done"
          }`
        );
      },

      onError: (err) => toast.error(err.message),
    });

  return { mutateCreateEditCabin, mutateCreateEditStatus };
}

export default useCreateCabin;
