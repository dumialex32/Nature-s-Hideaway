import { useNavigate } from "react-router-dom";

function useMoveBack() {
  const navigate = useNavigate();

  const moveBack = () => navigate(-1);

  return moveBack;
}

export default useMoveBack;
