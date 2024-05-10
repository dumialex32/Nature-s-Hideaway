import styled from "styled-components";
import UserMenu from "./UserMenu";
import Menus from "../ui/Menus";

const SyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
  return (
    <SyledHeader>
      <p></p>

      <Menus>
        <UserMenu />
      </Menus>
    </SyledHeader>
  );
}

export default Header;
