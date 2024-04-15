import styled from "styled-components";
import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "react-query";
import { deleteCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

import { formatCurrency } from "../../utils/helpers";

import Spinner from "../../ui/Spinner";
import Confirm from "../../ui/Confirm";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { useRef, useState } from "react";
import useCreateCabin from "./useCreateEditCabin";
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
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Modal.Open opens="duplicate">
                  <Menus.Button icon={<HiOutlineDuplicate size={"18"} />}>
                    Duplicate
                  </Menus.Button>
                </Modal.Open>

                <Menus.Button
                  onClick={handleIsOpenEditForm}
                  icon={<HiOutlinePencilAlt size={"18"} />}
                >
                  Edit
                </Menus.Button>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiOutlineTrash size={"18"} />}>
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="duplicate">
                <Confirm
                  onConfirm={duplicateCabin}
                  resourceName="cabin"
                  disabled={mutateDuplicateStatus === "pending"}
                  action="duplicate"
                  itemName={name}
                />
              </Modal.Window>

              <Modal.Window name="delete">
                <Confirm
                  resourceName="cabin"
                  onConfirm={() => mutateDeleteCabin({ cabin, curCabins })}
                  action="delete"
                  onCloseModal
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
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

// function Toggle({ id }) {
//   const { open, close, openId, setPosition } = useMenus();
//   const toggleRef = useRef();

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (
//         toggleRef.current &&
//         !toggleRef.current.contains(e.target) &&
//         openId === id
//       ) {
//         close();
//       }
//     }

//     document.body.addEventListener("click", handleClickOutside);

//     return () => {
//       document.body.removeEventListener("click", handleClickOutside);
//     };
//   }, [close, id, openId]);

//   function handleClick(e) {
//     const el = e.target.closest("button");
//     const rect = el.getBoundingClientRect();
//     setPosition({
//       x: window.innerWidth - rect.width - rect.x,
//       y: rect.y + rect.height + 8,
//     });

//     openId === "" || openId !== id ? open(id) : close();
//   }

//   return (
//     <StyledToggle ref={toggleRef} onClick={handleClick}>
//       <HiMenu />
//     </StyledToggle>
//   );
// }
