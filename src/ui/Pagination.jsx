import styled, { css } from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/variables";

const StyledPagination = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 0.4rem 0.8rem;

  & p > span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-self: center;
  grid-row: 1;
  gap: 2rem;
`;

const Pages = styled.ul`
  display: flex;
  gap: 1rem;
`;

const Page = styled.li`
  list-style: none;
  ${(props) =>
    props.active === "true" &&
    css`
      & button {
        font-weight: 600;
        background: var(--color-brand-500);
        color: var(--color-grey-100);
      }
    `}

  & button {
    display: block;
    border: none;
    padding: 0.2rem 0.4rem;
    border-radius: var(--border-radius-sm);
    transition: all 0.3s;

    &:hover {
      background-color: var(--color-brand-500);
      color: var(--color-grey-100);
    }
  }
`;

const PaginationButton = styled.button`
  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-500);
      color: var(--color-grey-100);
    `};

  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-grey-100);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const curPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  function prevPage() {
    const prev = curPage === 1 ? curPage : curPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  function nextPage() {
    const next = curPage === pageCount ? curPage : curPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function goToPage(value) {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      {count > PAGE_SIZE ? (
        <>
          <p>
            Showing <span>{(curPage - 1) * PAGE_SIZE + 1}</span> to{" "}
            <span>{curPage === pageCount ? count : curPage * PAGE_SIZE}</span>{" "}
            of <span>{count}</span> results
          </p>

          <Buttons>
            <PaginationButton disabled={curPage === 1} onClick={prevPage}>
              <HiChevronLeft /> <span>Previous</span>
            </PaginationButton>

            <Pages>
              {Array.from({ length: pageCount }, (_, i) => (
                <Page key={i} active={i + 1 === curPage ? "true" : "false"}>
                  <button onClick={() => goToPage(i + 1)}>{i + 1}</button>
                </Page>
              ))}
            </Pages>

            <PaginationButton
              disabled={curPage === pageCount}
              onClick={nextPage}
            >
              <span>Next</span> <HiChevronRight />
            </PaginationButton>
          </Buttons>
        </>
      ) : (
        <p>
          <span>{count}</span> results
        </p>
      )}
    </StyledPagination>
  );
}

export default Pagination;
