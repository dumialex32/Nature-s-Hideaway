import styled, { css } from "styled-components";

const backgroundColor = {
  "green-radiant": "linear-gradient(to left, var(--color-green-700), #5ba677)",
  green: "var(--color-green-700)",
  white: "var(--color-grey-0)",
};

const Form = styled.form`
  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */

      background: ${(props) => backgroundColor[props.color]};
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}



  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
  color: "white",
};

export default Form;

// padding: 2.4rem 4rem;

/* Box */
// background-color: var(--color-grey-0);
// border: 1px solid var(--color-grey-100);
// border-radius: var(--border-radius-md);
