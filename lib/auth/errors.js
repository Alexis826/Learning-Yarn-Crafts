// Turns an auth error (returned or thrown by @neon/auth) into a message for
// the person signing in. The client throws for non-OK responses, so forms
// should pass both returned and caught errors through this.
export function authErrorMessage(error, fallback) {
  const status = error?.error?.status ?? error?.status;
  const code = error?.code ?? error?.error?.code;

  if (status === 401 || /invalid.*(credentials|email or password)/i.test(code ?? "")) {
    return "Incorrect email or password.";
  }
  if (status === 429) {
    return "Too many attempts. Please wait a minute and try again.";
  }
  if (error instanceof TypeError) {
    return "We couldn't reach the server. Please check your connection and try again.";
  }
  return error?.message || fallback;
}
