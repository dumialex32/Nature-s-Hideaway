import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import useUser from "./useUser";
import { useEffect } from "react";
import styled from "styled-components";

const FullPageSpinner = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. Load the authendicated user
  const { user, isAuthenticated, isLoadingUser, userError } = useUser();
  console.log(user);

  //2.If there is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser) navigate("/login");
  }, [isAuthenticated, isLoadingUser, navigate]);

  //3. If loading, show spinner
  console.log(isLoadingUser);
  if (isLoadingUser)
    return (
      <FullPageSpinner>
        <Spinner />
      </FullPageSpinner>
    );

  //4. If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
