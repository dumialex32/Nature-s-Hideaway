import BookingsTable from "../bookings/BookingsTable";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import TableOperations from "../ui/TableOperations";

function Bookings() {
  return (
    <>
      <Row>
        <Heading as="h1">Bookings</Heading>
        <TableOperations>
          <div>fff</div>
        </TableOperations>
      </Row>

      <BookingsTable />
    </>
  );
}

export default Bookings;
