import styled, { css } from "styled-components";
import Empty from "../ui/Empty";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import useGetBooking from "./useGetBooking";
import { useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Button from "../ui/Button";
import BookingDataBox from "./BookingDataBox";

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

  console.log(booking);
  const { id, status } = booking || {};
  console.log(status);

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource={"booking"} />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>

          <Status status={status}>{status}</Status>
        </HeadingGroup>
        <Button type="link" onClick={() => navigate(-1)}>
          <HiArrowNarrowLeft />
          Back
        </Button>
      </Row>

      <BookingDataBox booking={booking} />
    </>
  );
}

export default BookingDetails;
