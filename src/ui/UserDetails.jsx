import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Heading from "./Heading";

const StyledUserDetails = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem 2.4rem;
  gap: 1rem;
  justify-content: center;

  &:first-child {
    color: var(---color-green-700);
  }
`;

function UserDetails() {
  const { user } = useUser();

  return (
    <StyledUserDetails>
      <p>{user.email}</p>
    </StyledUserDetails>
  );
}

export default UserDetails;
