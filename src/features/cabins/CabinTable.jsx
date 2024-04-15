<<<<<<< HEAD
import { useQuery } from "react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import CabinRow from "./CabinRow";
=======
import Spinner from "../../ui/Spinner";
>>>>>>> main

import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import useCabinOperations from "./useCabinOperations";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-300);

<<<<<<< HEAD
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { data: cabins, isLoading, error } = useQuery(["cabins"], getCabins);

  console.log(cabins, isLoading, error);
  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Cabin</div>
        <div>Name</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
      </TableHeader>

      {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
=======
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
  const { cabins, isLoading, error, curCabins } = useCabinOperations();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;

  return (
    <Menus>
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
            <CabinRow cabin={cabin} key={cabin.id} curCabins={curCabins} />
          )}
        />
      </Table>
    </Menus>
>>>>>>> main
  );
}

export default CabinTable;
<<<<<<< HEAD
=======

// cabins.map((cabin) => (
//   <CabinRow key={cabin.id} cabin={cabin} curCabins={cabins} />
// ));
>>>>>>> main
