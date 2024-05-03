import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

import toast from "react-hot-toast";

function useCheckIn() {
  const queryClient = useQueryClient();

  const { mutate: checkIn, status: checkInStatus } = useMutation({
    mutationKey: ["booking"],
    mutationFn: (bookingUpdateObj) => updateBooking(bookingUpdateObj),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} was succesfully updated`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkIn, checkInStatus };
}

export default useCheckIn;
