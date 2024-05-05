import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

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

  const queryClient = useQueryClient();

  const setEmail = (email) => dispatch({ type: "setEmail", payload: email });

  const setPassword = (password) =>
    dispatch({ type: "setPassword", payload: password });

  const setLoginError = (err) =>
    dispatch({ type: "setLoginError", payload: err });

  const navigate = useNavigate();

  const {
    mutate: userLogin,
    error,
    status: loginStatus,
  } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      console.log(user);
      navigate("/dashboard");
    },
    onError: (err) => {
      setLoginError(err);
      toast.error(err.message);
    },
  });

  function trackPasswordChange(e) {
    setPassword(e.target.value);

    if (loginError) setLoginError(null);
  }

  function trackEmailChange(e) {
    setEmail(e.target.value);

    if (loginError) setLoginError(null);
  }

  function onSubmit(e) {
    e.preventDefault(e);

    if (!email || !password) return;

    userLogin({ email, password });
  }

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
