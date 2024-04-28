import { formatDistance } from "date-fns/formatDistance";
import {
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineHome,
} from "react-icons/hi";
import styled, { css } from "styled-components";
import { format } from "date-fns/format";
import { formatCurrency } from "../../utils/helpers";

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
    height: 2.4rem;
    width: 2.4rem;
  }
`;

const TableSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 3.4rem;
  background-color: var(--color-grey-0);
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-grey-400);
`;

const GuestInfo = styled.div`
  display: flex;
  gap: 1rem;

  & img {
    max-width: 2.4rem;
    border-radius: var(--border-radius-tiny);
    display: block;
    border: 1px solid var(--color-grey-100);
  }

  & span:first-of-type {
    font-weight: 600;
    color: var(--color-grey-700);
  }
`;

const Observation = styled.div`
  padding: 2rem;
  box-shadow: 0px 0px 2px 0px var(--color-brand-200);
  border-radius: var(--border-radius-md);

  & div:first-of-type {
    font-weight: 600;
    color: var(--color-grey-700);
    text-align: center;
  }
`;

const Breakfast = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;

  span:nth-of-type(1) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  span > svg {
    color: var(--color-brand-500);
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  font-weight: 600;
  border-radius: var(--border-radius-md);
  ${(props) =>
    props.isPaid === "true"
      ? css`
          background-color: var(--color-green-100);
          color: var(--color-green-700);
        `
      : css`
          background-color: var(--color-yellow-100);
          color: #bd9016c9;
        `}

  & div {
    display: flex;
    align-items: center;
    gap: 1rem;

    & span:first-of-type {
      display: flex;
      gap: 0.2rem;
    }

    & svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;

const BookingDate = styled.div`
  margin-left: auto;
  color: var(--color-grey-400);
  font-size: 1.4rem;
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
    created_at: createdAt,
    startDate,
    endDate,
    isPaid,
    numGuests,
    observation,
    totalPrice,
  } = booking;

  console.log(isPaid);

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
            {`${format(startDate, "EEE, MMM dd yyyy")} (in
            ${formatDistance(startDate, new Date()).replace("about", "")}) -
            ${format(endDate, "EEE, MMM dd yyyy")}`}
          </span>
        </div>
      </StyledHeader>

      <TableSection>
        <Guest>
          <GuestInfo>
            <img src={countryFlag} alt={`Country flag of `} />
            <span>{`${fullName} + ${numGuests} ${
              numGuests === 1 ? "guest" : "guests"
            }`}</span>{" "}
            &bull; <span>{email}</span> &bull;{" "}
            <span>{`National ID: ${nationalID}`}</span>
          </GuestInfo>

          {observation && (
            <Observation>
              <div>Observation</div>
              <p>{`"${observation}"`}</p>
            </Observation>
          )}
        </Guest>

        <Breakfast>
          <span>
            <HiOutlineClock />
            Breakfast Included?
          </span>
          <span>{hasBreakfast ? "Yes" : "No"}</span>
        </Breakfast>

        <Price isPaid={(isPaid && "true") || "false"}>
          <div>
            <span>
              <HiOutlineCurrencyDollar />
              <span>Total Price</span>
            </span>

            <span>
              {extrasPrice
                ? `${formatCurrency(totalPrice)} (${formatCurrency(
                    totalPrice
                  )} cabin + ${formatCurrency(extrasPrice)} breakfast)`
                : formatCurrency(totalPrice)}
            </span>
          </div>

          <div>{isPaid ? "Paid" : "WILL PAY AT PROPERTY"}</div>
        </Price>

        <BookingDate>
          {`Booked ${format(createdAt, "EEE, MMM dd yyyy, H:mm")}`}
        </BookingDate>
      </TableSection>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
