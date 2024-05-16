import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Menus from "./Menus";
import UserDetails from "./UserDetails";
import useLogout from "../features/authentication/useLogout";
import UserAvatar from "./UserAvatar";

import { IoLogOutOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";

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

const UserMenuContainer = styled.div`
  display: flex;
  align-items: center;
`;

function UserMenu() {
  const {
    user: { email, id, user_metadata },
  } = useUser();

  const { userLogout, logoutStatus, logoutError } = useLogout();

  const userMenuThumbnail = email.charAt(0).toUpperCase();

  return (
    <UserMenuContainer>
      <UserAvatar avatar />

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

          <Menus.Button icon={<MdManageAccounts />}>
            <NavLink to="/account">Account</NavLink>
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </UserMenuContainer>
  );
}

export default UserMenu;
