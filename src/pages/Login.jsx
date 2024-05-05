import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import AuthProvider from "../features/authentication/LoginContext/LoginProvider";

const LoginLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 2.4rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Login to your account</Heading>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </LoginLayout>
  );
}

export default Login;
