import { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";

import { login } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { VscLoading } from "react-icons/vsc";
import ButtonWithSpinner from "../../ui/ButtonWithSpinner";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState(null);

  const usernameRef = useRef();

  const {
    mutate: userLogin,
    error,
    status: loginStatus,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      setLoginError(err);
    },
  });

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  function trackPassChange(e) {
    setPassword(e.target.value);

    if (loginError) setLoginError(null);
  }

  function trackUsernameChange(e) {
    setUsername(e.target.value);

    if (loginError) setLoginError(null);
  }

  function onSubmit(e) {
    e.preventDefault();

    if (!username || !password) return;

    userLogin({ username, password });
  }

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
