import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    font-weight: 600;

    &:hover:not(:disabled) {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover:not(:disabled) {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover:not(:disabled) {
      background-color: var(--color-red-800);
    }
  `,
};

function linkColor(color) {
  return css`
    color: ${color};
  `;
}

const StyledButton = styled.button`
  ${(props) => sizes[props.size]};
  ${(props) => variations[props.variation]}
  ${(props) =>
    props.disabled &&
    css`
      filter: grayscale(100%);
    `}

/* 
  display: flex;
  align-items: center; */
  /* gap: 1rem; */
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`;

const StyledNavLink = styled(NavLink)`
  ${(props) =>
    props.color ? linkColor(props.color) : linkColor("var(--color-brand-500)")}

  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
`;

function Button({
  customType = "button",
  size,
  variation,
  children,
  onClick,
  color,
  to,
  disabled,
}) {
  return (
    <>
      {customType === "link" && (
        <StyledNavLink color={color} to={to} onClick={onClick}>
          {children}
        </StyledNavLink>
      )}
      {customType === "button" && (
        <StyledButton
          size={size}
          variation={variation}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </StyledButton>
      )}
    </>
  );
}

export default Button;
