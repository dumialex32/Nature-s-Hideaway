import { createContext } from "react";
import useLoginReducer from "./useLoginReducer";

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const loginProviderValues = useLoginReducer();

  return (
    <LoginContext.Provider value={loginProviderValues}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
