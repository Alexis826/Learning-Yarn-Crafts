import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Get Started | Cozy Loops",
};

export default function GetStarted() {
  return (
    <main>
      <h1>Get Started</h1>
      <p>Create your account and choose the plan that fits you.</p>
      <SignUpForm />
    </main>
  );
}
