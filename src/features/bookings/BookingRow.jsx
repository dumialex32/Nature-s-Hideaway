import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import {
  formatCurrency,
  formatDate,
  formatDistanceFromNow,
  subtractDates,
} from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiCheck, HiLink, HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";
import useCheckOut from "./useCheckOut";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import Confirm from "../../ui/Confirm";
import useDeleteBooking from "./useDeleteBooking";
import { TbListDetails } from "react-icons/tb";

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
  const navigate = useNavigate();
  const { checkOut, isLoadingCheckOut } = useCheckOut();
  const { deleteBookingMutation, isLoadingDeleteBooking } = useDeleteBooking();

  if (isLoadingCheckOut || isLoadingDeleteBooking) return <Spinner />;

  const {
    id: bookingId,
    totalPrice,
    status,
    hasBreakfast,
    startDate,
    endDate,
    observation,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  } = booking;

  function handleCheckOut() {
    const bookingUpdate = {
      status: "checked-out",
    };
    checkOut({ bookingId, bookingUpdate });
  }

  return (
    <Modal>
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

        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<TbListDetails />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              More Details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiCheck />}
                onClick={() => navigate(`/checkIn/${bookingId}`)}
              >
                Check In
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Modal.Open opens="bookingCheckout">
                <Menus.Button icon={<GrFormClose />}>Check Out</Menus.Button>
              </Modal.Open>
            )}

            <Modal.Open opens="deleteBooking">
              <Menus.Button icon={<HiOutlineTrash size={"18"} />}>
                Delete Booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="bookingCheckout">
          <Confirm
            resourceName="booking"
            onConfirm={handleCheckOut}
            action="checkout"
            itemName={bookingId}
          />
        </Modal.Window>

        <Modal.Window name="deleteBooking">
          <Confirm
            resourceName="booking"
            action="delete"
            itemName={bookingId}
            onConfirm={() => deleteBookingMutation(bookingId)}
          />
        </Modal.Window>
      </Table.TableRow>
    </Modal>
  );
}

export default BookingRow;
