import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useGetCabins() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, error, isLoading };
}

export default useGetCabins;
