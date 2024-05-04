import styled, { css } from "styled-components";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import useGetBooking from "./useGetBooking";
import { useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Button from "../../ui/Button";
import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Modal from "../../ui/Modal";
import Confirm from "../../ui/Confirm";
import useDeleteBooking from "./useDeleteBooking";

const statusColor = {
  unconfirmed: css`
    background-color: var(--color-blue-700);
    color: var(--color-grey-100);
  `,
  "checked-in": css`
    background-color: var(--color-green-100);
    color: var(--color-green-700);
  `,
  "checked-out": css`
    background-color: var(--color-silver-100);
    color: var();
  `,
};

const HeadingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
`;

const Status = styled.div`
  ${(props) => statusColor[props.status]}

  border-radius: var(--border-radius-full);
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.4rem 1.2rem;
`;

function BookingDetails() {
  const { booking, isLoading } = useGetBooking();
  const navigate = useNavigate();
  const { deleteBookingMutation, isLoadingDeleteBooking } = useDeleteBooking();

  const { id: bookingId, status } = booking || {};

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource={"booking"} />;

  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{bookingId}</Heading>

            <Status status={status}>{status}</Status>
          </HeadingGroup>
          <Button type="link" onClick={() => navigate(-1)}>
            <HiArrowNarrowLeft />
            Back
          </Button>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          <Button
            variation="primary"
            size="medium"
            onClick={() => navigate(`/checkIn/${bookingId}`)}
          >
            Check In
          </Button>

          <Modal.Open opens="deleteBooking">
            <Button variation="danger" size="medium">
              Delete
            </Button>
          </Modal.Open>

          <Modal.Window name="deleteBooking">
            <Confirm
              resourceName="booking"
              action="delete"
              onConfirm={() =>
                deleteBookingMutation(bookingId, {
                  onSuccess: () => navigate("/bookings"),
                })
              }
            />
          </Modal.Window>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetails;
