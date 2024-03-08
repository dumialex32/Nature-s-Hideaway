import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Confirm from "../../ui/Confirm";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabinHook";
import { useRef, useState } from "react";
import useCreateCabin from "./useCreateEditCabinHook";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;
//   background-color: var(--color-grey-0);

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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

  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const isDuplicateSession = useRef(false);

  const {
    mutateCreateEditCabin: mutateDuplicateCabin,
    mutateCreateEditStatus: mutateDuplicateStatus,
  } = useCreateCabin({
    isDuplicateSession: isDuplicateSession.current,
  });

  function handleIsOpenEditForm() {
    setIsOpenEditForm(!isOpenEditForm);
  }

  function duplicateCabin() {
    isDuplicateSession.current = true;

    const newCabin = {
      name,
      maxCapacity,
      regularPrice,
      discount,
      image,
    };

    mutateDuplicateCabin(
      { newCabin },
      {
        onSuccess: (data) => {
          console.log(data);
        },
      }
    );
  }

  // react query useMutation
  const { mutateDeleteCabin, mutateDeleteStatus } = useDeleteCabin();

  if (mutateDeleteStatus === "pending" || mutateDuplicateStatus === "pending")
    return <Spinner />;
  return (
    <>
      <Table.TableRow>
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
          <Modal>
            <Modal.Open opens="deleteCabinConfirmation">
              <Button variation="secondary" size="small">
                <HiOutlineTrash size={"18"} />
              </Button>
            </Modal.Open>
            <Modal.Window name="deleteCabinConfirmation">
              <Confirm
                onConfirm={() => mutateDeleteCabin({ cabin, curCabins })}
                resourceName="cabin"
                disabled={mutateDeleteStatus === "pending"}
                action="delete"
              />
            </Modal.Window>
          </Modal>
          <Button
            variation="secondary"
            size="small"
            onClick={handleIsOpenEditForm}
          >
            <HiOutlinePencilAlt size={"18"} />
          </Button>
          <Modal>
            <Modal.Open opens="duplicateCabinConfirmation">
              <Button variation="secondary" size="small">
                <HiOutlineDuplicate size={"18"} />
              </Button>
            </Modal.Open>
            <Modal.Window name="duplicateCabinConfirmation">
              <Confirm
                onConfirm={duplicateCabin}
                resourceName="cabin"
                disabled={mutateDuplicateStatus === "pending"}
                action="duplicate"
                itemName={name}
              />
            </Modal.Window>
          </Modal>

          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button>cc</Menus.Button>
              <Menus.Button>cc</Menus.Button>
              <Menus.Button>cc</Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.TableRow>

      {isOpenEditForm && (
        <CreateCabinForm
          cabinToEdit={cabin}
          onCloseEditForm={handleIsOpenEditForm}
        />
      )}
    </>
  );
}

export default CabinRow;
