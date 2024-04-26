import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function Checkbox({ children, value, onChange, disabled }) {
  return (
    <StyledCheckbox>
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />

      <label>{children}</label>
    </StyledCheckbox>
  );
}

export default Checkbox;
