import Button from "../../ui/Button";

import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <div>
            <Button variation="primary" size="large">
              Add new cabin
            </Button>
          </div>
        </Modal.Open>

        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;

// Modal

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   function handleIsOpenModal() {
//     setIsOpenModal(!isOpenModal);
//   }

//   return (
//     <div>
//       <Button variation="primary" size="large" onClick={handleIsOpenModal}>
//         {!isOpenModal ? "Add cabin" : "Close"}
//       </Button>

//       {isOpenModal && (
//         <Modal onCloseModal={handleIsOpenModal}>
//           <CreateCabinForm onCloseModal={handleIsOpenModal} />
//         </Modal>
//       )}
//     </div>
//   );
// }
