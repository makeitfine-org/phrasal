import React from 'react';
import { PASSWORD_TIP, passwordRules } from '../auth/passwordPolicy';

interface PasswordRequirementsProps {
  id: string;
  password: string;
  /** Pass it to include the "does not contain your email" rule; leave it out when the email is unknown. */
  email?: string;
}

export default function PasswordRequirements({ id, password, email }: PasswordRequirementsProps) {
  return (
    <div
      id={id} data-testid="password-requirements"
      className="mt-2 rounded-xl border-2 border-yellow-400 bg-yellow-50 px-3 py-2 text-xs text-yellow-900 dark:border-yellow-500 dark:bg-yellow-950/40 dark:text-yellow-100"
    >
      <ul>
        {passwordRules(password, email).map(rule => (
          <li key={rule.id} data-testid={`password-rule-${rule.id}`} data-met={rule.met}
            className={rule.met ? 'font-medium text-green-700 dark:text-green-400' : undefined}>
            <span aria-hidden="true">{rule.met ? '✓' : '○'}</span> {rule.label}
          </li>
        ))}
      </ul>
      <p data-testid="password-tip" className="mt-1">{PASSWORD_TIP}</p>
    </div>
  );
}
