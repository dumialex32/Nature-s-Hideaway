import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import useUpdateSettings from "./useUpdateSettings";
import Row from "../../ui/Row";

function UpdateSettingsForm({ curSettings, defaultSettings }) {
  const { updateSettings, settingsStatus } = useUpdateSettings();

  const defSettings = {
    breakfastPrice: defaultSettings.breakfastPrice,
    maxBookingLength: defaultSettings.maxBookingLength,
    maxGuestsPerBooking: defaultSettings.maxGuestsPerBooking,
    minBookingLength: defaultSettings.minBookingLength,
  };

  const {
    minBookingLength,
    breakfastPrice,
    maxGuestsPerBooking,
    maxBookingLength,
  } = curSettings;

  function handleSettingChange(e, field) {
    const { value } = e.target;
    if (!value) return;

    const newSetting = { [field]: value };
    updateSettings(newSetting);
  }

  function handleDefaultSettingsChange() {
    updateSettings(defSettings);
  }

  return (
    <>
      <Form>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="minNights"
            value={minBookingLength}
            disabled={settingsStatus === "pending"}
            onChange={(e) => handleSettingChange(e, "minBookingLength")}
            error={"error"}
          />
        </FormRow>

        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="maxNights"
            value={maxBookingLength}
            disabled={settingsStatus === "pending"}
            onChange={(e) => handleSettingChange(e, "maxBookingLength")}
          />
        </FormRow>

        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="maxGuests"
            value={maxGuestsPerBooking}
            disabled={settingsStatus === "pending"}
            onChange={(e) => handleSettingChange(e, "maxGuestsPerBooking")}
          />
        </FormRow>

        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfastPrice"
            value={breakfastPrice}
            disabled={settingsStatus === "pending"}
            onChange={(e) => handleSettingChange(e, "breakfastPrice")}
          />
        </FormRow>
      </Form>
      <Row type="">
        <Button
          variation="primary"
          size="medium"
          onClick={handleDefaultSettingsChange}
        >
          Default settings
        </Button>
      </Row>
    </>
  );
}

export default UpdateSettingsForm;
