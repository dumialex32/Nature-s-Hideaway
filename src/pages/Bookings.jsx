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
              { sortValue: "name-desc", label: "Sorty by name [A-Z]" },
              { sortValue: "name-asc", label: "Sorty by name [Z-A]" },
              {
                sortValue: "capacity-asc",
                label: "Sorty by capacity (Highest)",
              },
              {
                sortValue: "capacity-desc",
                label: "Sort by capacity (Lowest)",
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
