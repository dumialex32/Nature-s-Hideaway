import Table from "../ui/Table";
import Spinner from "../ui/Spinner";
import BookingRow from "../bookings/BookingRow";
import Empty from "../ui/Empty";
import { useGetBookings } from "./useGetBookings";

function BookingsTable() {
  const { bookings, isLoading, error } = useGetBookings();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resource={"bookings"} />;

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
      </Table>
    </>
  );
}

export default BookingsTable;
