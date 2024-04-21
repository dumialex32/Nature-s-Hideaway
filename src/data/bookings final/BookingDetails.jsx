import styled from "styled-components";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import useGetBooking from "./useGetBooking";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Button from "../../ui/Button";
import BookingDataBox from "./BookingDataBox";
import useMoveBack from "../../hooks/useMoveBack";
import Tag from "../../ui/Tag";

const tagColor = {
  unconfirmed: "red",
  "checked-in": "green",
  "checked-out": "blue",
};

const HeadingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
`;

function BookingDetails() {
  const { booking, isLoading } = useGetBooking();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource={"booking"} />;

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>

          <Tag type={tagColor[status]}>{status}</Tag>
        </HeadingGroup>
        <Button type="link" onClick={() => moveBack()}>
          <HiArrowNarrowLeft />
          Back
        </Button>
      </Row>

      <BookingDataBox booking={booking} />

      <Button>Back</Button>
    </>
  );
}

export default BookingDetails;
