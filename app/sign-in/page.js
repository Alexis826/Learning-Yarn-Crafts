import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign In | Cozy Loops",
};

export default function SignIn() {
  return (
    <main>
      <h1>Sign In</h1>
      <p>Welcome back! Sign in to see your projects.</p>
      <SignInForm />
    </main>
  );
}
