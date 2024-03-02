import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useGetSettings() {
  const {
    data: settings,
    status: settingsStatus,
    error: settingsError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, settingsStatus, settingsError };
}

export default useGetSettings;
