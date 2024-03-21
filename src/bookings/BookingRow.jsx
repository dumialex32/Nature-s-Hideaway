import styled from "styled-components";
import Table from "../ui/Table";
import Tag from "../ui/Tag";
import {
  formatCurrency,
  formatDate,
  formatDistanceFromNow,
  subtractDates,
} from "../utils/helpers";
import { add } from "date-fns";
import { bookings } from "../data/data-bookings";

const Breakfast = styled.div`
  font-weight: 600;
  color: ${(props) => (props.breakfast === "true" ? "green" : "red")};
`;

const Cabin = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  font-family: "Sono";
  color: var(--color-grey-600);
`;
const Guests = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  font-family: "Sono";
  color: var(--color-grey-600);
`;
const Amount = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  font-family: "Sono";
  color: var(--color-grey-600);
`;

const Observation = styled.div`
  font-style: italic;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;

  & :first-child {
    font-weight: 600;
  }

  & :last-child {
    font-size: 1.3rem;
    color: var(--color-grey-400);
  }
`;

const bookingStatus = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};

function BookingRow({ booking }) {
  const {
    cabinPrice,
    extrasPrice,
    totalPrice,
    status,
    hasBreakfast,
    isPaid,
    cabinId,
    guestId,
    startDate,
    endDate,
    numGuests,
    observation,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  } = booking;

  return (
    <Table.TableRow>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <div>{guestName}</div>
        <div>{email}</div>
      </Stacked>
      <Stacked>
        <span>
          {formatDistanceFromNow(startDate, endDate)} &rarr;{" "}
          {subtractDates(endDate, startDate)} nights stay
        </span>
        <span>
          {formatDate(startDate)} &rarr; {formatDate(endDate)}
        </span>
      </Stacked>
      <Tag type={bookingStatus[status]}>{status}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Breakfast breakfast={hasBreakfast.toString()}>
        {hasBreakfast ? "Yes" : "No"}
      </Breakfast>
      <Observation>{observation || "No observation provided"}</Observation>
    </Table.TableRow>
  );
}

export default BookingRow;
