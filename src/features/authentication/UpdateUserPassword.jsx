import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";

function UpdateUserPassword() {
  return (
    <Form>
      <FormRow label="Password">
        <input id="password" />
      </FormRow>
    </Form>
  );
}

export default UpdateUserPassword;
