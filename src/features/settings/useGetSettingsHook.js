import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useGetSettings() {
  const queryClient = useQueryClient();

  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isLoading, error };
}

export default useGetSettings;
