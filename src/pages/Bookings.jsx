import BookingsTable from "../bookings/BookingsTable";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import TableOperations from "../ui/TableOperations";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Bookings</Heading>
        <TableOperations>
          <Filter
            filterOptions={[
              { filterValue: "all", label: "All" },
              { filterValue: "checked-in", label: "Checked In" },
              { filterValue: "checked-out", label: "Checked Out" },
              { filterValue: "unconfirmed", label: "Unconfirmed" },
            ]}
          />

          <SortBy
            sortOptions={[
              {
                sortValue: "startDate-asc",
                label: "Sort by Dates (Lowest)",
              },
              {
                sortValue: "startDate-desc",
                label: "Sort by Dates (Highest)",
              },
              {
                sortValue: "totalPrice-asc",
                label: "Sort by Amount (Lowest)",
              },
              {
                sortValue: "totalPrice-desc",
                label: "Sort by Amount (Highest)",
              },
            ]}
          />
        </TableOperations>
      </Row>

      <BookingsTable />
    </>
  );
}

export default Bookings;
