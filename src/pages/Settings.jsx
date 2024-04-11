import Row from "../ui/Row";
import Heading from "../ui/Heading";

import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import useGetSettings from "../features/settings/useGetSettingsHook";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import Error from "../ui/Error";

const FormContainer = styled.div`
  max-width: 100rem;
`;

const Settings = () => {
  const { settings, settingsStatus, settingsError } = useGetSettings();
  const isPending = "pending" === settingsStatus;

  return (
    <FormContainer>
      <Row>
        <Heading as="h1">Settings</Heading>
      </Row>
      {isPending && !settingsError && <Spinner />}
      {!isPending && settingsError && <Error>{settingsError.message}</Error>}
      <Row>
        {settings ? (
          <UpdateSettingsForm
            defaultSettings={settings[0]}
            curSettings={settings[1]}
          />
        ) : null}
      </Row>
    </FormContainer>
  );
};

export default Settings;
