import { useSearchParams } from "react-router-dom";
import useGetCabins from "./useGetCabins";
import { useEffect, useState } from "react";

function useCabinOperations() {
  const { cabins, isLoading, error } = useGetCabins();

  const [searchParams] = useSearchParams();

  const [sortedCabins, setSortedCabins] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      // Filter cabins
      let filteredCabins;
      const filterValue = searchParams.get("filter") || "all";

      if (filterValue === "all") {
        filteredCabins = cabins;
      }

      if (filterValue === "with-discount") {
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      }

      if (filterValue === "without-discount") {
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      }

      // Sort cabins

      const sortSearchParam = searchParams.get("sort") || "name-asc";

      const direction = sortSearchParam?.split("-").at(1);
      const sortValue = sortSearchParam?.split("-").at(0);

      setSortedCabins(
        filteredCabins
          .slice()
          .sort((a, b) =>
            direction === "asc"
              ? a[sortValue] - b[sortValue]
              : b[sortValue] - a[sortValue]
          )
      );
    }
  }, [cabins, error, isLoading, searchParams]);

  return { sortedCabins, isLoading, error, cabins };
}

export default useCabinOperations;
