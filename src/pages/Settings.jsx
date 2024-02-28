import Row from "../ui/Row";
import Heading from "../ui/Heading";

import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import useGetSettings from "../features/settings/useGetSettingsHook";
import Spinner from "../ui/Spinner";

const Settings = () => {
  const { settings, status, error } = useGetSettings();
  const isPending = "pending" === status;

  return isPending ? (
    <Spinner />
  ) : (
    <div>
      <Row>
        <Heading as="h1">Settings</Heading>
      </Row>

      <Row>{settings ? <UpdateSettingsForm settings={settings} /> : null}</Row>
    </div>
  );
};

export default Settings;
