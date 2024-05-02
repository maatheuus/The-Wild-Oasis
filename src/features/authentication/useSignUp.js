import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { isLoading, mutate: signUp } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUpApi(email, password, fullName),
    onSuccess: () =>
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      ),
    onError: (err) =>
      toast.error(
        err.message || "An error occurred while creating the account"
      ),
  });

  return { isLoading, signUp };
}
