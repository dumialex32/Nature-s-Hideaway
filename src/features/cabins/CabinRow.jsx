import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabinHook";
import { useRef, useState } from "react";
import Row from "../../ui/Row";
import useCreateCabin from "./useCreateEditCabinHook";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  background-color: var(--color-grey-0);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 600;
  color: var(--color-green-700);
`;

function CabinRow({ cabin, curCabins }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const [openForm, setOpenForm] = useState(false);
  const isDuplicateSession = useRef(false);
  console.log(isDuplicateSession);

  const { mutateCreateEditCabin: mutateDuplicateCabin } = useCreateCabin({
    isDuplicateSession: isDuplicateSession.current,
  });

  function handleEditOpenForm() {
    setOpenForm(!openForm);
  }

  function duplicateCabin() {
    isDuplicateSession.current = true;

    console.log(image);
    const newCabin = {
      name,
      maxCapacity,
      regularPrice,
      discount,
      image,
    };

    mutateDuplicateCabin({ newCabin });
  }

  // react query useMutation
  const { mutateDeleteCabin, mutateDeleteStatus } = useDeleteCabin();

  if (mutateDeleteStatus === "pending") return <Spinner />;
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <Row>
          <Button
            variation="secondary"
            size="small"
            onClick={() => mutateDeleteCabin({ cabin, curCabins })}
            disabled={mutateDeleteStatus === "pending"}
          >
            Delete
          </Button>
          <Button
            variation="secondary"
            size="small"
            onClick={handleEditOpenForm}
          >
            Edit
          </Button>
          <Button variation="secondary" size="small" onClick={duplicateCabin}>
            Duplicate
          </Button>
        </Row>
      </TableRow>
      {openForm && (
        <CreateCabinForm
          cabinToEdit={cabin}
          onEditOpenForm={handleEditOpenForm}
        />
      )}
    </>
  );
}

export default CabinRow;
