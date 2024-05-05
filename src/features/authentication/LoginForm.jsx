import { useEffect, useRef } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { VscLoading } from "react-icons/vsc";
import ButtonWithSpinner from "../../ui/ButtonWithSpinner";
import { useAuthProvider } from "./AuthContext/useAuthProvider";

function LoginForm() {
  const {
    username,
    password,
    loginError,
    loginStatus,
    trackPassChange,
    trackUsernameChange,
    onSubmit,
  } = useAuthProvider();

  const usernameRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <Form onSubmit={onSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <input
          ref={usernameRef}
          type="email"
          id="email"
          value={username}
          autoComplete="email"
          onChange={(e) => trackUsernameChange(e)}
        />
      </FormRow>

      <FormRow label="Password" orientation="vertical">
        <input
          type="password"
          id="password"
          value={password}
          autoComplete="password"
          onChange={(e) => trackPassChange(e)}
        />
      </FormRow>

      <FormRow orientation="vertical" error={loginError?.message}>
        <Button variation="primary" size="medium">
          {loginStatus === "pending" ? (
            <ButtonWithSpinner spinner={<VscLoading color="white" />}>
              Is Loading
            </ButtonWithSpinner>
          ) : (
            <span>Login</span>
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
