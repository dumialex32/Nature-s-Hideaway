import { useContext } from "react";
import { LoginContext } from "./LoginProvider";

export function useLoginProvider() {
  const provider = useContext(LoginContext);

  if (!provider) throw new Error("Auth Provider used outside of it's context");

  return provider;
}
