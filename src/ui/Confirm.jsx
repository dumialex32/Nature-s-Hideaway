import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

import { capitalizedItem } from "../utils/helpers";

const StyledConfirm = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function Confirm({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  action,
  itemName,
}) {
  return (
    <StyledConfirm>
      <Heading as="h3">
        {capitalizedItem(action)} {resourceName}
      </Heading>
      {action === "delete" && (
        <p>
          Are you sure you want to {action} this {resourceName} permanently?
          This action cannot be undone.
        </p>
      )}
      {action === "duplicate" && (
        <p>Are you sure you want to duplicate the cabin {itemName} ?</p>
      )}

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          variation="danger"
          disabled={disabled}
          onClick={() => onConfirm(onCloseModal)}
        >
          {capitalizedItem(action)}
        </Button>
      </div>
    </StyledConfirm>
  );
}

export default Confirm;
