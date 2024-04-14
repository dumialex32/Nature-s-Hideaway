import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useGetBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterValue = searchParams.get("filter") || "all";

  const filter =
    filterValue === "all"
      ? null
      : { field: "status", filterValue: filterValue, method: "eq" };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });

  return { bookings, isLoading, error };
}
