import { useReducer } from "react";

import { useNavigate } from "react-router-dom";
import { login } from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const initialState = {
  username: "",
  password: "",
  loginError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setUsername":
      return { ...state, username: action.payload };

    case "setPassword":
      return { ...state, password: action.payload };

    case "setLoginError":
      return { ...state, loginError: action.payload };

    default:
      return initialState;
  }
}

function useAuthReducer() {
  const [{ username, password, loginError }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const setUsername = (username) =>
    dispatch({ type: "setUsername", payload: username });

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
      toast.error("Provided email or password are incorrect");
    },
  });

  function trackPassChange(e) {
    setPassword(e.target.value);

    if (loginError) setLoginError(null);
  }

  function trackUsernameChange(e) {
    setUsername(e.target.value);

    if (loginError) setLoginError(null);
  }

  function onSubmit(e) {
    e.preventDefault(e);

    if (!username || !password) return;

    userLogin({ username, password });
  }

  return {
    username,
    password,
    loginError,
    loginStatus,
    error,
    setUsername,
    setPassword,
    setLoginError,
    trackPassChange,
    trackUsernameChange,
    onSubmit,
  };
}

export default useAuthReducer;
