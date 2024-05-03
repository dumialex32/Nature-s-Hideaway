import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, status: checkOutStatus } = useMutation({
    mutationFn: (bookingUpdateObj) => updateBooking(bookingUpdateObj),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking ${data.id} was succesfully checked-out`);
    },
  });

  return { checkOut, checkOutStatus };
}

export default useCheckOut;
