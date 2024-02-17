import { useEffect } from "react";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

function Cabins() {
  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <>
      <Row>
        <Heading as="h1">All cabins</Heading>
      </Row>

      <Row>
        <CabinTable role="table" />
      </Row>
    </>
  );
}

export default Cabins;
