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
import useCheckIn from "./useCheckIn";
import useGetSettings from "../settings/useGetSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 2rem 3.4rem;
  display: flex;
  justify-content: space-between;

  p:last-child span {
    font-weight: 600;
  }
`;

function BookingCheckIn() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [confirmBreakfast, setConfirmBreakfast] = useState(false);

  const { booking, isLoading } = useGetBooking();
  const { curSettings: { breakfastPrice } = {} } = useGetSettings();
  const moveBack = useMoveBack();

  const { checkIn, checkInStatus } = useCheckIn();

  const {
    id: bookingId,
    guests: { fullName } = {},
    isPaid,
    hasBreakfast,
    numNights,
    numGuests,
    totalPrice,
    status,
  } = booking || {};

  const optionalBreakfastPrice = numNights * breakfastPrice * numGuests;

  useEffect(() => {
    if (status === "unconfirmed" && isPaid) setConfirmPaid(false);
    if (status === "unconfirmed" && !isPaid) setConfirmPaid(isPaid || false);
    if (status !== "unconfirmed" && isPaid) setConfirmPaid(isPaid);
    setConfirmBreakfast(hasBreakfast || false);
  }, [isPaid, hasBreakfast, status]);

  function handleConfirmPaid(e) {
    setConfirmPaid(e.target.checked);
  }

  function handleConfirBreakfast(e) {
    setConfirmBreakfast(e.target.checked);

    const obj = {
      hasBreakfast: e.target.checked,
      extrasPrice: optionalBreakfastPrice,
    };

    checkIn({ bookingId, obj });
  }

  function handleBookingConfirm() {
    const obj = {
      isPaid: confirmPaid,
      status: (confirmPaid && "checked-in") || "unconfirmed",
    };

    checkIn({ bookingId, obj });
  }

  if (isLoading || checkInStatus === "pending") return <Spinner />;
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

      {!confirmBreakfast && (
        <Box>
          <Checkbox
            id="orderBreakfast"
            checked={confirmBreakfast}
            onChange={handleConfirBreakfast}
            disabled={confirmBreakfast}
          >
            {confirmBreakfast && hasBreakfast ? (
              <p>
                Breakfast included for{" "}
                <span>{formatCurrency(optionalBreakfastPrice)}</span>
              </p>
            ) : (
              <span>
                Include breakfast for {formatCurrency(optionalBreakfastPrice)}
              </span>
            )}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={handleConfirmPaid}
          disabled={confirmPaid}
          id="confirm"
        >
          {confirmPaid && isPaid ? (
            <p>
              {fullName} has already paid{" "}
              <span>{formatCurrency(totalPrice)}</span> for the rent.
            </p>
          ) : (
            <p>
              I confirm that {fullName} has paid{" "}
              <span>{formatCurrency(totalPrice)}</span> for the rent.
            </p>
          )}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={
            !confirmPaid || (confirmPaid && isPaid && status !== "unconfirmed")
          }
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
