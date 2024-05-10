import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const StyledButtonSpinnerContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const StyledButtonSpinner = styled.div`
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000)
      top/10px 10px no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-600));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;

function ButtonSpinner({ children, spinner }) {
  return (
    <StyledButtonSpinnerContainer>
      {children}
      <StyledButtonSpinner>{spinner}</StyledButtonSpinner>
    </StyledButtonSpinnerContainer>
  );
}

export default ButtonSpinner;
