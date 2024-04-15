import styled from "styled-components";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

const StyledSortBy = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.6rem;
  gap: 0.6rem;
  border: 1px solid var(--color-grey-50);
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

function SortBy({ sortOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get("sort") || sortOptions.at(0).sortValue;

  function handleChange(value) {
    searchParams.set("sort", value);
    setSearchParams(searchParams); // with `searchParams.set("sort", value);`, since SearchParams object is a reference type, setting it to itself doesn't trigger a re-render so the purpose of calling setSearchParams(searchParams) is to trigger a re-render
  }

  return (
    <StyledSortBy>
      <Select
        type="white"
        value={currentValue}
        sortOptions={sortOptions}
        onChange={handleChange}
      />
    </StyledSortBy>
  );
}

export default SortBy;
