import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import Filter from "../ui/Filter";
import { CabinOperations } from "../features/cabins/CabinOperations";
import SortBy from "../ui/SortBy";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinOperations>
          <Filter
            filterOptions={[
              { filterValue: "all", label: "All" },
              { filterValue: "without-discount", label: "Without discount" },
              { filterValue: "with-discount", label: "With Discount" },
            ]}
          />
          <SortBy
            sortOptions={[
              { sortValue: "name-asc", label: "Sort by Name [A-Z]" },
              { sortValue: "name-desc", label: "Sort By Name [Z-A]" },
              {
                sortValue: "maxCapacity-asc",
                label: "Sort By capacity (High first)",
              },
              {
                sortValue: "maxCapacity-desc",
                label: "Sort By capacity (Low first)",
              },
              {
                sortValue: "regularPrice-asc",
                label: "Sort By price (Lowest)",
              },
              {
                sortValue: "regularPrice-desc",
                label: "Sort By price (Highgest)",
              },
            ]}
          />
        </CabinOperations>
      </Row>

      <Row>
        <CabinTable />

        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
