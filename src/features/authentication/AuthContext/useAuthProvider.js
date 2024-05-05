import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export function useAuthProvider() {
  const provider = useContext(AuthContext);

  if (!provider) throw new Error("Auth Provider used outside of it's context");

  return provider;
}
