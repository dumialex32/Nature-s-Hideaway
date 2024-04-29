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
import useGetSettings from "../settings/useGetSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 2rem 3.4rem;
  display: flex;
  justify-content: space-between;
`;

function BookingCheckIn() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [confirmBreakfast, setConfirmBreakfast] = useState(false);

  const { booking, isLoading } = useGetBooking();
  const { curSettings: { breakfastPrice } = {} } = useGetSettings();
  const moveBack = useMoveBack();

  const { mutateBooking, mutateBookingStatus } = useUpdateBookingStatus();

  const {
    id: bookingId,
    guests: { fullName } = {},
    isPaid,
    hasBreakfast,
    numNights,
    numGuests,
  } = booking || {};

  useEffect(() => {
    setConfirmPaid(isPaid || false);
    setConfirmBreakfast(hasBreakfast || false);
  }, [isPaid, hasBreakfast]);

  function handleConfirmPaid(e) {
    setConfirmPaid(e.target.checked);
  }

  function handleConfirBreakfast(e) {
    setConfirmBreakfast(e.target.checked);
  }

  function handleBookingConfirm() {
    const obj = {
      isPaid: confirmPaid,
      status: (confirmPaid && "checked-in") || "unconfirmed",
    };

    mutateBooking({ bookingId, obj });
  }

  function handleBookingBreakfast() {
    const obj = {
      hasBreakfast: confirmBreakfast,
      extrasPrice: numNights * breakfastPrice * numGuests,
    };

    mutateBooking({ bookingId, obj });
  }

  if (isLoading || mutateBookingStatus === "pending") return <Spinner />;
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
          id="orderBreakfast"
          checked={confirmBreakfast}
          onChange={handleConfirBreakfast}
          disabled={hasBreakfast}
        >
          {confirmBreakfast && hasBreakfast ? (
            <span>Breakfast included</span>
          ) : (
            <span>Include breakfast</span>
          )}
        </Checkbox>

        <Button
          variation="primary"
          size="small"
          disabled={!confirmBreakfast || hasBreakfast}
          onClick={handleBookingBreakfast}
        >
          Include Breakfast
        </Button>
      </Box>

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={handleConfirmPaid}
          disabled={confirmPaid}
          id="confirm"
        >
          {confirmPaid && isPaid ? (
            <span>{fullName} has already paid the rent</span>
          ) : (
            <span> I confirm that {fullName} has paid the rent.</span>
          )}
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
