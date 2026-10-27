import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import * as authApi from '../api/authApi';
import type { CurrentUser } from '../types';

export type AuthStatus = 'loading' | 'authenticated' | 'anonymous';

export interface AuthContextValue {
  status: AuthStatus;
  user: CurrentUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const noop = async () => {};

/** Default value lets components render without a provider (anonymous visitor). */
export const AuthContext = createContext<AuthContextValue>({
  status: 'anonymous',
  user: null,
  login: noop,
  register: noop,
  logout: noop,
  refresh: noop,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<CurrentUser | null>(null);

  const refresh = useCallback(async () => {
    try {
      const current = await authApi.fetchCurrentUser();
      setUser(current);
      setStatus(current ? 'authenticated' : 'anonymous');
    } catch {
      // The site must keep working when the auth backend is unreachable.
      setUser(null);
      setStatus('anonymous');
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    await authApi.login(email, password);
    await refresh();
  }, [refresh]);

  const register = useCallback(async (email: string, password: string) => {
    await authApi.register(email, password);
    await login(email, password);
  }, [login]);

  const logout = useCallback(async () => {
    await authApi.logout();
    // Logout clears the XSRF cookie; the follow-up GET sets a fresh one.
    await refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({ status, user, login, register, logout, refresh }),
    [status, user, login, register, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
