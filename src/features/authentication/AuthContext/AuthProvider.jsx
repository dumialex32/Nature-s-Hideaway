import { createContext } from "react";

import useAuthReducer from "./useAuthReducer";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const authProviderValue = useAuthReducer();

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
