import styled from "@emotion/styled";

const Root = styled.svg`
  display: block;
  margin-right: 12px;
`;

export const Cross = () => (
  <Root
    width="20"
    height="20"
    viewBox="0 0 28 28"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path
      d="M28 2.913 16.913 14 28 25.087 25.087 28 14 16.913 2.913 28 0 25.087 11.087 14 0 2.913 2.913 0 14 11.087 25.087 0z"
      fillRule="nonzero"
    />
  </Root>
);
