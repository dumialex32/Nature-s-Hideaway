import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [openForm, setOpenForm] = useState(false);

  function handleCreateOpenForm() {
    setOpenForm(!openForm);
  }
  console.log(openForm);
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
        <Button variation="primary" size="large" onClick={handleCreateOpenForm}>
          {!openForm ? "Add cabin" : "Close"}
        </Button>
      </Row>
      {openForm && (
        <Row>
          <CreateCabinForm onCreateOpenForm={handleCreateOpenForm} />
        </Row>
      )}
    </>
  );
}

export default Cabins;
