import { createContext, useContext, useRef, useState } from "react";
import styled, { css } from "styled-components";

const ToolTipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ToolTipWindowContainer = styled.div`
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.6rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-300);
  z-index: 999;
  width: 16rem;

  ${(props) => css`
    left: ${props.position.coordinates.left}px;
    top: ${props.position.coordinates.top -
    props.position.coordinates.height * props.position.positionY}px;
    transform: translateX(
      calc(-50% + ${props.position.coordinates.width / 2}px)
    );
  `}
`;

const ToolTipWindowContent = styled.p`
  font-size: 1.1rem;
`;

const ToolTipContext = createContext();

function ToolTip({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const toolTipRef = useRef();
  const toolTipRect = useRef({});

  function handleMouseEnter() {
    if (!toolTipRef.current) return;

    toolTipRect.current = toolTipRef.current.getBoundingClientRect();

    if (toolTipRef.current) setIsVisible(false);

    setIsVisible(true);
  }

  function handleMouseLeave() {
    setIsVisible(false);
  }

  return (
    <ToolTipContext.Provider
      value={{ isVisible, toolTipPos: toolTipRect.current }}
    >
      <ToolTipContainer
        ref={toolTipRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </ToolTipContainer>
    </ToolTipContext.Provider>
  );
}

function ToggleIcon({ children }) {
  return children;
}

function Window({ text, positionY }) {
  const {
    isVisible,
    toolTipPos: { top, width, left, height },
  } = useContext(ToolTipContext);

  if (!isVisible) return null;

  return (
    <ToolTipWindowContainer
      position={{ positionY, coordinates: { top, width, left, height } }}
    >
      <ToolTipWindowContent>{text}</ToolTipWindowContent>
    </ToolTipWindowContainer>
  );
}

ToolTip.ToggleIcon = ToggleIcon;
ToolTip.Window = Window;

export default ToolTip;
