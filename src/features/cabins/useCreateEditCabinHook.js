import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin({ isEditSession, isDuplicateSession }) {
  console.log(isEditSession, isDuplicateSession);
  const queryClient = useQueryClient();

  const { mutate: mutateCreateEditCabin, status: mutateCreateEditStatus } =
    useMutation({
      mutationFn: createEditCabin,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
        toast.success(
          `The ${
            isDuplicateSession ? "duplicate" : isEditSession ? "edit" : "cabin"
          } has been succesfully ${
            !isDuplicateSession && !isEditSession ? "creted" : "done"
          }`
        );
      },

      onError: (err) => toast.error(err.message),
    });

  return { mutateCreateEditCabin, mutateCreateEditStatus };
}

export default useCreateCabin;
