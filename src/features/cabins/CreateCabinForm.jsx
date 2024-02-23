import { useForm } from "react-hook-form";

import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { isString } from "lodash";

function CreateCabinForm({ onSetOpenForm, cabinToEdit = {} }) {
  const queryClient = useQueryClient();

  // Edit the current cabin
  const { id: editId, ...editValues } = cabinToEdit;

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

  const { mutate, status } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success(
        `${
          isEditSession
            ? "Edit cabin was succesffuly done"
            : "Cabin was sucesffully created"
        }`
      );
      queryClient.invalidateQueries(["cabins"]);
      // onSetOpenForm(!openForm);
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const newCabin = !isString(data.image)
      ? {
          ...data,
          image: data.image instanceof FileList ? data.image[0] : data.image,
        }
      : { ...data };

    mutate({ newCabin, editId });
  }

  function onError(errors) {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onSetOpenForm}
        >
          Cancel
        </Button>
        <Button disabled={status === "pending"}>
          {(isEditSession && "Edit") || "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
