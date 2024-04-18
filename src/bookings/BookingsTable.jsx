import Table from "../ui/Table";
import Spinner from "../ui/Spinner";
import BookingRow from "../bookings/BookingRow";
import Empty from "../ui/Empty";
import { useGetBookings } from "./useGetBookings";
import Pagination from "../ui/Pagination";

function BookingsTable() {
  const { bookings, isLoading, error, count } = useGetBookings();
  console.log(bookings);

  if (isLoading) return <Spinner />;
  if (!bookings) return <Empty resource={"bookings"} />;

  return (
    <>
      <Table columns="0.6fr 1fr 1.5fr 1fr 1fr 1fr 1fr">
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
    </>
  );
}

export default BookingsTable;
