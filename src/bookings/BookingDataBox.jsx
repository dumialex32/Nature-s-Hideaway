import { formatDistance } from "date-fns/formatDistance";
import { HiOutlineHome } from "react-icons/hi";
import styled from "styled-components";
import { format } from "date-fns/format";

const StyledBookingDataBox = styled.div`
  border: 1px solid var(--color-grey-50);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-brand-500);
  color: var(--color-grey-200);
  padding: 1rem 3.4rem;

  & div {
    display: flex;
    align-items: self-end;
    gap: 1rem;
    font-size: 1.6rem;
    font-weight: 600;
  }

  & svg {
    height: 2.6rem;
    width: 2.6rem;
  }
`;

const TableSection = styled.section`
  padding: 2rem 3.4rem;
  background-color: var(--color-grey-0);
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: var(--color-grey-400);

  & img {
    max-width: 2.6rem;
    border-radius: var(--border-radius-tiny);
    display: block;
    border: 1px solid var(--color-grey-100);
  }

  & span:first-of-type {
    font-weight: 600;
    color: var(--color-grey-700);
  }
`;

function BookingDataBox({ booking }) {
  const {
    cabinPrice,
    extrasPrice,
    hasBreakfast,
    status,
    cabins: { name: cabinName },
    guests: { fullName, email, nationalID, nationality, countryFlag },
    numNights,
    created_at,
    startDate,
    endDate,
    isPaid,
    numGuests,
    observation,
  } = booking;

  return (
    <StyledBookingDataBox>
      <StyledHeader>
        <div>
          <HiOutlineHome />
          <span>
            {numNights} nights in Cabin {cabinName}
          </span>
        </div>

        <div>
          <span>
            {format(startDate, "EEEE, MMM dd yyyy")} (in{" "}
            {formatDistance(startDate, endDate)})
          </span>{" "}
          - <span>{format(endDate, "EEE, MMM dd yyyy")}</span>
        </div>
      </StyledHeader>

      <TableSection>
        <Guest>
          <img src={countryFlag} />
          <span>
            {fullName} + {numGuests} guests
          </span>{" "}
          &bull; <span>{email}</span> &bull;{" "}
          <span>National ID {nationalID}</span>
        </Guest>
      </TableSection>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
