import Row from "../ui/Row";
import Heading from "../ui/Heading";
import useGetSettings from "../features/settings/useGetSettingsHook";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  const { settings, isLoading, error } = useGetSettings();
  console.log(settings);

  return (
    <div>
      <Row>
        <Heading as="h1">Settings</Heading>
      </Row>

      <Row>
        <UpdateSettingsForm settings={settings} />
      </Row>
    </div>
  );
}

export default Settings;
