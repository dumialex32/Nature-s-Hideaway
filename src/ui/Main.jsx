import styled from "styled-components";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  background-color: var(--color-grey-100);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;
`;

function Main(props) {
  const { children } = props;
  return <StyledMain>{children}</StyledMain>;
}

export default Main;
