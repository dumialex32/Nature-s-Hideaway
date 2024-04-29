import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useGetSettings() {
  const {
    data: settings,
    status: settingsStatus,
    isLoading,
    error: settingsError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {
    defaultSettings: settings?.[0],
    curSettings: settings?.[1],
    settingsStatus,
    settingsError,
    isLoading,
  };
}

export default useGetSettings;
