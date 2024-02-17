import { useEffect } from "react";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import styled from "styled-components";

const Container = styled.div`
  margin: 4rem auto;
  background-color: var(--color-grey-50);
`;

function Cabins() {
  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Heading as="h1">All cabins</Heading>
        </Row>

        <Row>
          <CabinTable role="table" />
        </Row>
      </Container>
    </>
  );
}

export default Cabins;
