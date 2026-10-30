import { useEffect, useState } from 'react';
import { fetchAuthProviders } from '../api/authApi';
import type { AuthProviders } from '../types';

const NONE: AuthProviders = { google: false };

// One request per page load, shared by every component that asks; a failed request hides the providers.
let cachedProviders: Promise<AuthProviders> | null = null;

function loadAuthProviders(): Promise<AuthProviders> {
  cachedProviders ??= fetchAuthProviders().catch(() => NONE);
  return cachedProviders;
}

/** For tests: the next caller fetches again. */
export function resetAuthProvidersCache(): void {
  cachedProviders = null;
}

/** The sign-in providers the backend has turned on; `null` while loading. */
export function useAuthProviders(): AuthProviders | null {
  const [providers, setProviders] = useState<AuthProviders | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadAuthProviders().then(result => {
      if (!cancelled) {
        setProviders(result);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return providers;
}
