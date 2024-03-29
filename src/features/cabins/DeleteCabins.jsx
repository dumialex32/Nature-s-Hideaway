import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { deleteAllCabins } from "../../services/apiCabins";

function DeleteCabins() {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteAllCabins, status: deleteAllCabinsStatus } =
    useMutation({
      mutationFn: deleteAllCabins,
      onSuccess: () => {
        queryClient.invalidateQueries(["cabins", "guests", "bookings"]);
        toast.success("All cabins were deleted");
      },
      onError: (error) => toast.error(error.message),
    });

  return (
    <Button size="large" variation="primary" onClick={mutateDeleteAllCabins}>
      Delete All Cabins
    </Button>
  );
}

export default DeleteCabins;
