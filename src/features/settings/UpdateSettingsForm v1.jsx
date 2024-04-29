import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useUpdateSettings } from "./useUpdateSettingsHook";
import Row from "../../ui/Row";

function UpdateSettingsForm({ settings }) {
  const defaultValues = {
    minNights: settings.minBookingLength,
    maxNights: settings.maxBookingLength,
    maxGuests: settings.maxGuestsPerBooking,
    breakfastPrice: settings.breakfastPrice,
  };

  const { updateSettings, settingsStatus } = useUpdateSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  function onSubmit(data) {
    console.log(data);
    const newSetting = {
      minBookingLength: data.minNights,
      maxBookingLength: data.maxNights,
      maxGuestsPerBooking: data.maxGuests,
      breakfastPrice: data.breakfastPrice,
    };
    console.log(newSetting);
    updateSettings(newSetting);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="Minimum nights/booking"
          error={errors?.minNights?.message}
        >
          <Input
            type="number"
            id="minNights"
            {...register("minNights", { required: "This label is required" })}
          />
        </FormRow>

        <FormRow
          label="Maximum nights/booking"
          error={errors?.maxNights?.message}
        >
          <Input
            type="number"
            id="maxNights"
            {...register("maxNights", { required: "This label is required" })}
          />
        </FormRow>
        <FormRow
          label="Maximum guests/booking"
          error={errors?.maxGuests?.message}
        >
          <Input
            type="number"
            id="maxGuests"
            {...register("maxGuests", { required: "This label is required" })}
          />
        </FormRow>
        <FormRow
          label="Breakfast price"
          error={errors?.breakfastPrice?.message}
        >
          <Input
            type="number"
            id="breakfastPrice"
            {...register("breakfastPrice", {
              required: "This label is required",
            })}
          />
        </FormRow>

        <Row type="horizontal">
          <Button variation="primary" size="medium">
            Change settings
          </Button>

          <Button variation="secondary" size="medium">
            Restore default settings
          </Button>
        </Row>
      </Form>
    </>
  );
}

export default UpdateSettingsForm;
