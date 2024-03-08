import { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiMenu } from "react-icons/hi";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-50);
  /* background-color: var(--color-grey-0); */
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  console.log(children);
  const [openId, setOpenId] = useState("");

  const open = setOpenId;
  const close = () => setOpenId("");

  return (
    <MenusContext.Provider value={{ openId, open, close }}>
      {children}
    </MenusContext.Provider>
  );
}

// function Menu({ children }) {
//   return <StyledMenu>{children}</StyledMenu>;
// }

function Toggle({ id }) {
  const { open, close, openId } = useMenus();

  function handleClick(e) {
    const clicked = e.target.closest("button");
    if (!clicked) return;
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiMenu />
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { openId } = useMenus();

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={{ x: 20, y: 20 }}>{children}</StyledList>,
    document.body
  );
}

function Button({ children }) {
  return (
    <li>
      <StyledButton>{children}</StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

const useMenus = () => {
  const context = useContext(MenusContext);
  if (context === undefined)
    throw new Error("Menus context used outside of the Menus component");
  return context;
};

export default Menus;
