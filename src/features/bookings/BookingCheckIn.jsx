import { HiArrowNarrowLeft } from "react-icons/hi";
import BookingDataBox from "./BookingDataBox";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import useGetBooking from "./useGetBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import ButtonGroup from "../../ui/ButtonGroup";
import useMoveBack from "../../hooks/useMoveBack";
import { useEffect, useState } from "react";
import Empty from "../../ui/Empty";
import useUpdateBookingStatus from "./useUpdateBookingStatus";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 2rem 3.4rem;
`;

function BookingCheckIn() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useGetBooking();
  const moveBack = useMoveBack();
  const { mutateConfirm, mutateConfirmStatus } = useUpdateBookingStatus();

  const { id: bookingId, guests: { fullName } = {}, isPaid } = booking || {};

  useEffect(() => {
    setConfirmPaid(isPaid || false);
  }, [isPaid]);

  function handleConfirmPaid(e) {
    setConfirmPaid(e.target.checked);
  }

  function handleBookingConfirm() {
    const obj = {
      isPaid: confirmPaid,
      status: (confirmPaid && "checked-in") || "unconfirmed",
    };

    mutateConfirm({ bookingId, obj });
  }

  if (isLoading || mutateConfirmStatus === "pending") return <Spinner />;
  if (!booking) return <Empty resource={"booking"} />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check In #{bookingId}</Heading>

        <Button type="link" onClick={() => moveBack()}>
          <HiArrowNarrowLeft />
          Back
        </Button>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={handleConfirmPaid}
          disabled={confirmPaid}
          id="confirm"
        >
          I confirm that {fullName} has paid the rent.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={!confirmPaid || isPaid}
          variation="primary"
          size="medium"
          onClick={handleBookingConfirm}
        >{`Check in booking #${bookingId}`}</Button>

        <Button variation="secondary" size="small" onClick={() => moveBack()}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingCheckIn;
