import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, status: settingsStatus } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings were successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSettings, settingsStatus };
}
