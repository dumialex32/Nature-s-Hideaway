import { useEffect, useRef } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { VscLoading } from "react-icons/vsc";
import ButtonSpinner from "../../ui/ButtonSpinner";
import { useLoginProvider } from "./LoginContext/useLoginProvider";

function LoginForm() {
  const {
    username,
    password,
    loginError,
    loginStatus,
    trackPasswordChange,
    trackEmailChange,
    onSubmit,
  } = useLoginProvider();

  const usernameRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <Form color="green-radiant" onSubmit={onSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <input
          ref={usernameRef}
          type="email"
          id="email"
          value={username}
          autoComplete="email"
          onChange={(e) => trackEmailChange(e)}
        />
      </FormRow>

      <FormRow label="Password" orientation="vertical">
        <input
          type="password"
          id="password"
          value={password}
          autoComplete="password"
          onChange={(e) => trackPasswordChange(e)}
        />
      </FormRow>

      <FormRow orientation="vertical" error={loginError?.message}>
        <Button variation="primary" size="medium">
          {loginStatus === "pending" ? (
            <ButtonSpinner spinner={<VscLoading color="white" />}>
              Is Loading
            </ButtonSpinner>
          ) : (
            <span>Login</span>
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
