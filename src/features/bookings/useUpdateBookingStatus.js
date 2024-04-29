import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

import toast from "react-hot-toast";

function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  const { mutate: mutateConfirm, status: mutateConfirmStatus } = useMutation({
    mutationKey: ["bookingId"],
    mutationFn: (obj) => updateBooking(obj),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookingId"] });
      toast.success(`Booking ${data.id} was succesfully updated`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutateConfirm, mutateConfirmStatus };
}

export default useUpdateBookingStatus;
