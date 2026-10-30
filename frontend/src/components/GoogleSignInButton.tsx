import { GOOGLE_SIGN_IN_URL } from '../api/authApi';
import { useAuthProviders } from '../auth/useAuthProviders';

// Google's branding colours for the neutral button, light and dark.
const googleButtonClass =
  'flex w-full items-center justify-center gap-3 px-4 py-2 rounded-lg border font-medium ' +
  'border-[#747775] bg-[#FFFFFF] text-[#1F1F1F] hover:bg-[#F2F2F2] ' +
  'dark:border-[#8E918F] dark:bg-[#131314] dark:text-[#E3E3E3] dark:hover:bg-[#262628] ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-500';

function GoogleLogo() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

/**
 * "Continue with Google" and an "or" divider, shown only when the backend has Google sign-in turned on. A plain link,
 * not a router `Link`: the browser leaves the SPA, and the backend redirects to Google.
 */
export default function GoogleSignInButton() {
  const providers = useAuthProviders();
  if (!providers?.google) {
    return null;
  }
  return (
    <>
      <a href={GOOGLE_SIGN_IN_URL} data-testid="google-sign-in" className={googleButtonClass}>
        <GoogleLogo />
        <span>Continue with Google</span>
      </a>
      <div data-testid="auth-divider" className="flex items-center gap-3 my-6 text-sm text-gray-500 dark:text-gray-400">
        <span aria-hidden="true" className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
        or
        <span aria-hidden="true" className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
      </div>
    </>
  );
}
