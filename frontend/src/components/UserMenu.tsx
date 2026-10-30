import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { useClickOutside } from '../hooks/useClickOutside';

interface UserMenuProps {
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

const linkClass =
  'px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 ' +
  'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors';

function AdminBadge() {
  return (
    <span
      data-testid="admin-badge"
      className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300"
    >
      Admin
    </span>
  );
}

export default function UserMenu({ variant = 'desktop', onNavigate }: UserMenuProps) {
  const { status, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prefix = variant === 'mobile' ? 'nav-mobile' : 'nav';

  useClickOutside(ref, () => setOpen(false));

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  if (status === 'loading') return null;

  const handleLogout = async () => {
    setOpen(false);
    onNavigate?.();
    try {
      await logout();
    } finally {
      navigate('/');
    }
  };

  if (status === 'anonymous' || !user) {
    return (
      <div className={variant === 'mobile' ? 'flex flex-col px-1' : 'flex items-center gap-1'}>
        <Link to="/login" onClick={onNavigate} data-testid={`${prefix}-login`} className={linkClass}>Log in</Link>
        <Link to="/register" onClick={onNavigate} data-testid={`${prefix}-register`} className={linkClass}>Sign up</Link>
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-2 mb-1">
          <span className="truncate">{user.email}</span>
          {user.role === 'ADMIN' && <AdminBadge />}
        </div>
        <Link
          to="/account/security" onClick={onNavigate} data-testid={`${prefix}-account-security`}
          className={`${linkClass} -ml-3 block`}
        >
          Account security
        </Link>
        <button onClick={handleLogout} data-testid={`${prefix}-logout`} className={`${linkClass} -ml-3`}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        data-testid="user-menu"
        aria-expanded={open}
        aria-haspopup="true"
        className={`${linkClass} max-w-[10rem] truncate`}
      >
        {user.email}
      </button>
      {open && (
        <div
          data-testid="user-menu-dropdown"
          className="absolute right-0 top-full mt-1 w-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg py-2 z-50"
        >
          <div className="px-4 pb-2 flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
            <span className="truncate">{user.email}</span>
            {user.role === 'ADMIN' && <AdminBadge />}
          </div>
          <Link
            to="/account/security" onClick={() => setOpen(false)} data-testid={`${prefix}-account-security`}
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Account security
          </Link>
          <button
            onClick={handleLogout}
            data-testid="nav-logout"
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
