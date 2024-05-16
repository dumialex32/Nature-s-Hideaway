import { FaRegUser } from "react-icons/fa";
import styled from "styled-components";

const RegUserAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 1rem; */
  width: 3.6rem;
  height: 3.6rem;
  background-color: var(--color-grey-300);
  border-radius: 50%;
`;

function UserAvatar() {
  return (
    <RegUserAvatar>
      <FaRegUser size={20} color="white" />
    </RegUserAvatar>
  );
}

export default UserAvatar;
