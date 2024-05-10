import { isArray } from "lodash";
import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 20rem 0.5fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    /* justify-content: flex-end; */
    gap: 1.2rem;

    & > p {
      color: red;
      order: 1;
    }

    & > div {
      display: flex;
      margin-left: auto;
      order: 2;
    }
  }

  & input {
    border: 2px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    padding: 0.4rem 0.8rem;
  }

  ${(props) =>
    props.orientation === "vertical" &&
    css`
      grid-template-columns: 1fr;
      gap: 1rem;
      color: var(--color-grey-800);

      & label {
        font-weight: 600;
      }

      &:not(:last-child) {
        border-bottom: none;
      }

      &:has(button) {
        display: flex;
        justify-content: flex-start;
        gap: 1.2rem;
      }
    `}
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  grid-column: 1/-1;
`;

const Success = styled.p`
  font-size: 1.4rem;
  color: var(--color-green-700);
`;

const Label = styled.label`
  font-weight: 500;
`;

function FormRow({ children, label, error, success, orientation }) {
  return (
    <StyledFormRow orientation={orientation}>
      {label && <Label htmlFor={`${children.props.id}`}>{label}</Label>}
      {children}

      {success && <Success>{success}</Success>}

      {isArray(error) &&
        error?.length > 0 &&
        error.map((err) => {
          return <Error key={err}>{err}</Error>;
        })}
      {error && !isArray(error) && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
