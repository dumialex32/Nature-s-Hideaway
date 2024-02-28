import Row from "../ui/Row";
import Heading from "../ui/Heading";

import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <div>
      <Row>
        <Heading as="h1">Settings</Heading>
      </Row>

      <Row>
        <UpdateSettingsForm />
      </Row>
    </div>
  );
}

export default Settings;
