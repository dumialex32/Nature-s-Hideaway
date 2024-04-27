import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function Checkbox({ children, checked, onChange, id, disabled }) {
  return (
    <StyledCheckbox>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />

      <label htmlFor={id}>{children}</label>
    </StyledCheckbox>
  );
}

export default Checkbox;
