import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 12.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img
        src="https://hggwcxcmcukexjiqisjq.supabase.co/storage/v1/object/public/company-logo/nhaLogo-ts-bg.png?t=2024-05-04T16%3A18%3A35.495Z"
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;
