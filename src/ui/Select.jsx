import styled from "styled-components";

const StyledSelect = styled.select`
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-50)"
        : "var(--color-grey-700)"};

  background-color: var(--color-grey-0);
  font-weight: 500;
`;

function Select({ sortOptions, onChange, value, ...props }) {
  return (
    <StyledSelect
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {sortOptions.map((sortOption) => (
        <option key={sortOption.sortValue} value={sortOption.sortValue}>
          {sortOption.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
