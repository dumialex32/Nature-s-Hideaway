import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import BookingRow from "../bookings/BookingRow";
import Empty from "../../ui/Empty";
import { useGetBookings } from "./useGetBookings";
import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";

function BookingsTable() {
  const { bookings, isLoading, error, count } = useGetBookings();

  if (isLoading) return <Spinner />;
  if (error) return <Empty resource={"bookings"} />;

  return (
    <Menus>
      <Table columns="0.6fr 1fr 1.5fr 1fr 1fr 1fr 1fr 0.2fr">
        <Table.TableHeader>
          <div>Cabin</div>
          <div>Guests</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div>Breakfast</div>
          <div>Observation</div>
        </Table.TableHeader>

        <Table.TableBody
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.TableFooter>
          <Pagination count={count} />
        </Table.TableFooter>
      </Table>
    </Menus>
  );
}

export default BookingsTable;
