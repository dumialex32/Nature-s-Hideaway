import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/variables";

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

  // Pagination
  const page = searchParams.get("page") || 1;

  const pageRange = {
    from: page ? (page - 1) * PAGE_SIZE : null,
    to: page ? page * PAGE_SIZE : null,
  };
  console.log(pageRange.from, pageRange.to);

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortValue, pageRange],
    queryFn: () => getBookings({ filter, sort, pageRange }),
  });

  return { bookings, isLoading, error, count };
}
