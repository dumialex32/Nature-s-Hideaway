import { useNavigate } from "react-router-dom";
import Confirm from "../../ui/Confirm";

import Modal from "../../ui/Modal";
import useDeleteBooking from "./useDeleteBooking";

function DeleteBookingButton({ children, bookingId }) {
  const { deleteBookingMutation } = useDeleteBooking();
  const navigate = useNavigate();

  function handleDeleteBooking(onCloseModal) {
    deleteBookingMutation(bookingId, {
      onSuccess: () => {
        onCloseModal();
        navigate("/bookings");
      },
    });
  }

  return (
    <>
      <Modal>
        <Modal.Open opens="deleteBooking">{children}</Modal.Open>

        <Modal.Window name="deleteBooking">
          <Confirm
            resourceName="booking"
            action="delete"
            itemName={bookingId}
            onConfirm={handleDeleteBooking}
            onCloseModal
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default DeleteBookingButton;
