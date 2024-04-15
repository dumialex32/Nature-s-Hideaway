import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useGetBookings() {
  const [searchParams] = useSearchParams();

  // Filter bookings
  const filterValue = searchParams.get("filter") || "all";

  const filter =
    filterValue === "all"
      ? null
      : { field: "status", filterValue: filterValue, method: "eq" };

  // Sort bookings

  const sortValue = searchParams.get("sort") || "startDate-desc";

  const [sortBy, direction] = sortValue.split("-");

  const sort = { sortBy, direction: direction === "asc" ? true : false };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortValue],
    queryFn: () => getBookings({ filter, sort }),
  });

  return { bookings, isLoading, error };
}
