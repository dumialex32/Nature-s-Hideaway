import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteBookingMutation, isLoading: isLoadingDeleteBooking } =
    useMutation({
      mutationFn: (bookingId) => deleteBooking(bookingId),

      onSuccess: ({ id }) => {
        toast.success(`Booking ${id} has been sucesfully deleted`);
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { deleteBookingMutation, isLoadingDeleteBooking };
}

export default useDeleteBooking;
