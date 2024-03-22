import { useForm } from "react-hook-form";

import { isString } from "lodash";

import useCreateCabin from "./useCreateEditCabinHook";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import Confirm from "../../ui/Confirm";

function CreateCabinForm({ onCloseEditForm, onCloseModal, cabinToEdit = {} }) {
  // Edit the current cabin
  const { id: editId, ...editValues } = cabinToEdit;
  const prevImg = cabinToEdit?.image;

  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: editId ? editValues : null,
  });

  const { mutateCreateEditCabin, mutateCreateEditStatus } = useCreateCabin({
    isEditSession,
  });

  function onSubmit(data) {
    const newCabin = !isString(data.image)
      ? {
          ...data,

          image: data.image instanceof FileList ? data.image[0] : data.image,
        }
      : { ...data };

    mutateCreateEditCabin(
      { newCabin, editId, prevImg },
      {
        onSuccess: (data) => {
          console.log(data);
          reset();
          (isEditSession && onCloseEditForm?.()) || onCloseModal?.();
        },
      }
    );
  }

  function onError(errors) {}

  if (mutateCreateEditStatus === "pending") return <Spinner />;

  return (
    <Form
      type={onCloseModal && "modal"}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This input is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "The discount sould be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Image" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow type="horizontal">
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() =>
            isEditSession ? onCloseEditForm?.() : onCloseModal?.()
          }
        >
          Cancel
        </Button>

        <Button
          size="small"
          variation="primary"
          disabled={mutateCreateEditStatus === "pending"}
        >
          {(isEditSession && "Edit") || "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
