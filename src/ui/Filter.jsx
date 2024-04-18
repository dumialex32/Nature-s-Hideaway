import { useNavigate, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem;
  gap: 0.6rem;
  border: 1px solid var(--color-grey-50);
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const FilterButton = styled.button`
  border: none;
  border-radius: var(--border-radius-md);
  padding: 0.6rem 1.2rem;
  background-color: var(--color-grey-50);

  &:hover {
    background-color: var(--color-brand-500);
    color: var(--color-grey-50);
  }

  ${(props) =>
    props.active === "true" &&
    css`
      background-color: var(--color-brand-500);
      color: var(--color-grey-50);
    `}
`;

function Filter({ filterOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentFilter =
    searchParams.get("filter") || filterOptions.at(0).filterValue;

  function handleClick(value) {
    searchParams.set("filter", value);
    searchParams.set("page", 1); // Reset page to 1
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {filterOptions.map((filter) => {
        return (
          <FilterButton
            active={filter.filterValue === currentFilter ? "true" : "false"}
            key={filter.filterValue}
            onClick={() => handleClick(filter.filterValue)}
          >
            {filter.label}
          </FilterButton>
        );
      })}
    </StyledFilter>
  );
}

export default Filter;
