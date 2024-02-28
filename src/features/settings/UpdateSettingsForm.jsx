import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import styled from "styled-components";

import useGetSettings from "./useGetSettingsHook";
import Spinner from "../../ui/Spinner";
import { useEffect, useMemo } from "react";
import { anyPropertyIsEmpty } from "../../utils/helpers";

const StyledError = styled.div`
  color: var(--color-red-700);
  font-weight: 500;
`;

function UpdateSettingsForm() {
  const { settings, status, error } = useGetSettings();

  const defaultValues = useMemo(
    () => ({
      minNights: settings?.minBookingLength,
      maxNights: settings?.maxBookingLength,
      maxGuests: settings?.maxGuestsPerBooking,
      breakfastPrice: settings?.breakfastPrice,
    }),
    [settings]
  );

  console.log(defaultValues);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (anyPropertyIsEmpty(defaultValues)) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  function onSubmit() {
    console.log("test");
  }

  if (status === "pending") return <Spinner />;

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

        <Button variations="primary" size="large">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default UpdateSettingsForm;
