import { useReducer } from "react";

import useLogin from "./useLogin";

const initialState = {
  email: "",
  password: "",
  loginError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: action.payload };

    case "setPassword":
      return { ...state, password: action.payload };

    case "setLoginError":
      return { ...state, loginError: action.payload };

    default:
      return initialState;
  }
}

function useLoginReducer() {
  const [{ email, password, loginError }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Get the user login data
  const { userLogin, error, loginStatus } = useLogin(setLoginError);

  // Action creator functions
  function setLoginError(err) {
    dispatch({ type: "setLoginError", payload: err });
  }

  const setEmail = (email) => dispatch({ type: "setEmail", payload: email });

  function setPassword(password) {
    dispatch({ type: "setPassword", payload: password });
  }

  function trackPasswordChange(e) {
    setPassword(e.target.value);

    if (loginError) setLoginError(null);
  }

  function trackEmailChange(e) {
    setEmail(e.target.value);

    if (loginError) setLoginError(null);
  }

  // On submit function called on submiting the `LoginForm`
  function onSubmit(e) {
    e.preventDefault(e);

    if (!email || !password) return;

    userLogin({ email, password });
  }

  // Returned state/functions by the reducer custom hook used as values for the `Login Context Provider`
  return {
    email,
    password,
    loginError,
    loginStatus,
    error,
    setEmail,
    setPassword,
    setLoginError,
    trackPasswordChange,
    trackEmailChange,
    onSubmit,
  };
}

export default useLoginReducer;
