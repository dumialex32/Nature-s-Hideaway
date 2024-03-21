import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiMenu } from "react-icons/hi";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-50);
  border: solid 1px var(--color-grey-300);
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

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-500);
    transition: all 0.3s;
  }

  & svg:hover {
    color: var(--color-);
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({});

  const open = setOpenId;
  const close = () => setOpenId("");

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

// function Menu({ children }) {
//   return <StyledMenu>{children}</StyledMenu>;
// }

function Toggle({ id }) {
  const { open, close, openId, setPosition } = useMenus();
  const toggleRef = useRef();

  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(e.target) &&
        openId === id
      )
        close();
    }

    document.body.addEventListener("click", handleOutsideClick);
    return () => document.body.removeEventListener("click", handleOutsideClick);
  }, [close, id, openId]);

  function handleClick(e) {
    const el = e.target.closest("button");

    if (!el) return;

    const rect = el.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === id ? close() : open(id);
  }

  return (
    <StyledToggle ref={toggleRef} onClick={handleClick}>
      <HiMenu />
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { openId, position } = useMenus();

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position}>{children}</StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  return (
    <li>
      <StyledButton onClick={onClick}>
        {icon}
        {children}
      </StyledButton>
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
