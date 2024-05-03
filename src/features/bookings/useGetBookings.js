import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/variables";

export function useGetBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortValue, page],

    queryFn: () => getBookings({ filter, sort, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortValue, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });
  }

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortValue, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });
  }

  return { bookings, isLoading, error, count };
}
