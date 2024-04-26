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
import { useState } from "react";
import Empty from "../../ui/Empty";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 2rem 3.4rem;
`;

function BookingCheckIn() {
  const { booking, isLoading } = useGetBooking();
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  console.log(confirmPaid);

  function handleConfirmPaid(e) {
    setConfirmPaid(e.target.checked);
  }

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource={"booking"} />;

  const {
    id,
    guests: { fullName },
  } = booking;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check In #{id}</Heading>

        <Button type="link" onClick={() => moveBack()}>
          <HiArrowNarrowLeft />
          Back
        </Button>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          value={confirmPaid}
          onChange={handleConfirmPaid}
          disabled={confirmPaid}
        >
          I confirm that {fullName} has paid the rent.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={!confirmPaid}
          variation="primary"
          size="medium"
        >{`Check in booking #${id}`}</Button>

        <Button variation="secondary" size="small" onClick={() => moveBack()}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingCheckIn;
