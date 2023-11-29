import { api } from "~/trpc/server";
import SignUp from "../_components/authRelated/SignUp";

export default async function SignUpServer() {
  const handleSignUp = async (
    name: string | undefined,
    email: string,
    password: string,
  ) => {
    "use server";
    try {
      const result = await api.user.signUp.mutate({ name, email, password });
      // Handle result
      console.log("Signup successful:", result);
    } catch (error) {
      // Handle error
      console.error("Signup failed:", error);
    }
  };

  return <SignUp signUserUp={handleSignUp} />;
}
