import Spinner from "../../ui/Spinner";

import useGetCabins from "./useGetCabinsHook";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-300);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-200);
//   border-bottom: 1px solid var(--color-grey-300);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { cabins, isLoading, error } = useGetCabins();

  if (isLoading) return <Spinner />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.TableHeader>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.TableHeader>

      <Table.TableBody
        data={cabins}
        render={(cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} curCabins={cabins} />
        )}
      />
    </Table>
  );
}

export default CabinTable;

// cabins.map((cabin) => (
//   <CabinRow key={cabin.id} cabin={cabin} curCabins={cabins} />
// ));
