//FORM made with TanStack Form and Zod libraries

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

import styled from "styled-components";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import ButtonGroup from "../../../ui/ButtonGroup";
import Button from "../../../ui/Button";
import useSignup from "./useSignup";

const SignupContainer = styled.div`
  max-width: 80rem;
`;

function SignupForm() {
  const { signupUser, signupStatus, signupError } = useSignup();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validatorAdapter: zodValidator,

    onSubmit: async ({ value: { fullName, email, password } }) => {
      signupUser({ fullName, email, password });
    },
  });

  return (
    <SignupContainer>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="fullName"
          validators={{
            onChange: z.string().min(3, "The name must have at least 3 chars"),
          }}
          // eslint-disable-next-line react/no-children-prop
          children={(field) => (
            <FormRow label="Full name" error={field.state.meta.errors}>
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormRow>
          )}
        />
        <form.Field
          name="email"
          validators={{
            onChange: z
              .string()
              .email(
                "Please enter a valid email address in the format: user@example.com."
              ),
          }}
          // eslint-disable-next-line react/no-children-prop
          children={(field) => (
            <FormRow label="Email" error={field.state.meta.errors}>
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormRow>
          )}
        />
        <form.Field
          name="password"
          validators={{
            onChange: z
              .string()
              .min(8, "Must contain at least 8 chars")
              .regex(/[A-Z]/, "Must contain 1 upper case"),
          }}
          // eslint-disable-next-line react/no-children-prop
          children={(field) => (
            <FormRow
              label="Password"
              error={field.state.meta.errors[0]?.split(",")}
            >
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormRow>
          )}
        />
        <form.Field
          name="passwordConfirm"
          validators={{
            onChange: z
              .string()
              .refine((val) => val === form.state.values.password, {
                message: "Password does not match",
              }),
          }}
          // eslint-disable-next-line react/no-children-prop
          children={(field) => (
            <FormRow label="Repeat password" error={field.state.meta.errors}>
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormRow>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          // eslint-disable-next-line react/no-children-prop
          children={([canSubmit, isSubmiting]) => (
            <FormRow success={""}>
              <ButtonGroup>
                <Button
                  variation="primary"
                  size="medium"
                  type="submit"
                  disabled={!canSubmit || signupStatus === "pending"}
                >
                  Submit
                </Button>

                <Button
                  variation="danger"
                  size="medium"
                  type="reset"
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Reset
                </Button>
              </ButtonGroup>
            </FormRow>
          )}
        />
      </Form>
    </SignupContainer>
  );
}

export default SignupForm;
