import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { deleteAllData } from "../services/apiCabins";

function DeleteAll() {
  const queryClient = useQueryClient();

  const { mutate: deleteAll, status: deleteAllStatus } = useMutation({
    mutationFn: deleteAllData,
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins", "guests", "bookings"]);
      toast.success("All cabins were deleted");
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <Button size="small" variation="danger" onClick={deleteAll}>
      Delete All Data
    </Button>
  );
}

export default DeleteAll;
