import Row from "../ui/Row";
import Heading from "../ui/Heading";

import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import useGetSettings from "../features/settings/useGetSettings";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import Error from "../ui/Error";

const FormContainer = styled.div`
  max-width: 100rem;
`;

function Settings() {
  const {
    defaultSettings,
    curSettings,
    isLoading,
    settingsStatus,
    settingsError,
  } = useGetSettings();
  // const isPending = "pending" === settingsStatus;

  if (isLoading) return <Spinner />;
  if (settingsError) return <Error>{settingsError.message}</Error>;

  return (
    <FormContainer>
      <Row>
        <Heading as="h1">Settings</Heading>
      </Row>

      <UpdateSettingsForm
        defaultSettings={defaultSettings}
        curSettings={curSettings}
      />
    </FormContainer>
  );
}

export default Settings;
