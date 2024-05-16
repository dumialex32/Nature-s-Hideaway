import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import useUser from "./useUser";
import FileInput from "../../ui/FileInput";
import { useState } from "react";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data.avatar[0].name);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email">
        <input defaultValue={email} id="fullName" type="text" disabled />
      </FormRow>

      <FormRow
        label="Full name"
        error={errors.fullName && "This field is required"}
      >
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          {...register("fullName", {
            required: true,
          })}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          {...register("avatar", { required: true })}
        />
      </FormRow>

      <FormRow>
        <ButtonGroup>
          <Button variation="secondary" size="small">
            Cancel
          </Button>

          <Button variation="primary" size="small">
            Update account
          </Button>
        </ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
