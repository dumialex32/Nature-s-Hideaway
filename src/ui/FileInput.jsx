import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default FileInput;

// const FileInput = styled.input.attrs({ type: "file" })`
//   display: flex;
//   align-items: center;
//   gap: 1rem;

//   &::file-selector-button {
//     border-radius: var(--border-radius-sm);
//     border: none;
//     background-color: var(--color-brand-600);
//     color: var(--color-grey-50);
//     font-size: 1.2rem;
//     padding: 0.4rem 0.8rem;
//     text-transform: uppercase;
//     font-weight: 600;
//     text-align: center;
//     cursor: pointer;

//     &:hover {
//       background-color: var(--color-brand-700);
//     }
//   }
// `;

// export default FileInput;
