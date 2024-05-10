import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Menus from "./Menus";
import UserDetails from "./UserDetails";
import { IoLogOutOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/apiAuth";
import useLogout from "../features/authentication/useLogout";

const StyledUserMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-50);
  width: 3rem;
  height: 3rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-green-700);
  color: var(--color-grey-0);
`;

function UserMenu() {
  const {
    user: { email },
  } = useUser();

  const { userLogout, logoutStatus, logoutError } = useLogout();

  const userMenuThumbnail = email.charAt(0).toUpperCase();

  return (
    <Menus.Menu>
      <Menus.Toggle
        toggleIcon={<StyledUserMenu>{userMenuThumbnail}</StyledUserMenu>}
        id="userMenu"
      />

      <Menus.List id="userMenu">
        <UserDetails />

        <Menus.Button icon={<IoLogOutOutline />} onClick={() => userLogout()}>
          Logout
        </Menus.Button>
      </Menus.List>
    </Menus.Menu>
  );
}

export default UserMenu;
