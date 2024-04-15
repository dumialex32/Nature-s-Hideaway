import styled from "styled-components";

const StyledMain = styled.main`
<<<<<<< HEAD
  background-color: var(--color-grey-50);
=======
  background-color: var(--color-grey-100);
>>>>>>> main
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

function Main(props) {
  const { children } = props;
  return <StyledMain>{children}</StyledMain>;
}

export default Main;
