import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
      </Row>

      <Row type="horizontal">
        <Button
          variation="primary"
          size="large"
          onClick={() => setOpenForm(!openForm)}
        >
          {!openForm ? "Add cabin" : "Close"}
        </Button>
      </Row>
      {openForm && (
        <Row>
          <CreateCabinForm openForm={openForm} onSetOpenForm={setOpenForm} />
        </Row>
      )}
    </>
  );
}

export default Cabins;
