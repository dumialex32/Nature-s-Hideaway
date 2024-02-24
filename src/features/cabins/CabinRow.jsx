import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabinHook";
import { useState } from "react";

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

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const [openForm, setOpenForm] = useState(false);

  function handleEditOpenForm() {
    setOpenForm(!openForm);
  }

  const cabinImgName = cabin.image.split("/").at(-1);

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
        <div>
          <Button
            variation="secondary"
            size="small"
            onClick={() => mutateDeleteCabin({ cabinId, cabinImgName })}
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
        </div>
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
