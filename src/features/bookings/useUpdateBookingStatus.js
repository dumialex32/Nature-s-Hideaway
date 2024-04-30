import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

import toast from "react-hot-toast";

function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  const { mutate: mutateBooking, status: mutateBookingStatus } = useMutation({
    mutationKey: ["booking"],
    mutationFn: (obj) => updateBooking(obj),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.success(`Booking ${data.id} was succesfully updated`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutateBooking, mutateBookingStatus };
}

export default useUpdateBookingStatus;
