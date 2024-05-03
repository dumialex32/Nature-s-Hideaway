import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingMutation, isLoading: isLoadingDeleteBooking } =
    useMutation({
      mutationFn: (bookingId) => deleteBooking(bookingId),

      onSuccess: ({ id }) => {
        toast.success(`Booking ${id} has been sucesfully deleted`);
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { deleteBookingMutation, isLoadingDeleteBooking };
}

export default useDeleteBooking;
