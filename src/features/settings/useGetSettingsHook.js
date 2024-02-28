import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useGetSettings() {
  const {
    data: settings,
    status,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, status, error };
}

export default useGetSettings;
