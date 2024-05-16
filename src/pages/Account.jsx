import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdateUserPassword from "../features/authentication/UpdateUserPassword";
import styled from "styled-components";

const AccountFormLayout = styled.div`
  width: 80rem;
`;

function Account() {
  return (
    <>
      <Row>
        <Heading as="h1">Update your account</Heading>
      </Row>
      <AccountFormLayout>
        <Row>
          <Heading as="h3">Update user data</Heading>
          <UpdateUserDataForm />
        </Row>

        <Row>
          <Heading as="h3">Update user password</Heading>
          <UpdateUserPassword />
        </Row>
      </AccountFormLayout>
    </>
  );
}

export default Account;
