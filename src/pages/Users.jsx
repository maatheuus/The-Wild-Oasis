import SingUpForm from "../features/authentication/SingUpForm";
import Heading from "../ui/Heading";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SingUpForm />
    </>
  );
}

export default NewUsers;
