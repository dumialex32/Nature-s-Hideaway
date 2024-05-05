import { createContext } from "react";

import useAuthReducer from "./useLoginReducer";

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const loginProviderValues = useAuthReducer();

  return (
    <LoginContext.Provider value={loginProviderValues}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
