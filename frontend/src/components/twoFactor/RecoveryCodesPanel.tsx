import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { downloadRecoveryCodes, recoveryCodesText } from '../../utils/recoveryCodesFile';

const COPIED_MS = 2000;

const primaryButtonClass =
  'px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700';

const secondaryButtonClass =
  'px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 ' +
  'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors';

interface RecoveryCodesPanelProps {
  codes: string[];
  onDone: () => void;
}

export default function RecoveryCodesPanel({ codes, onDone }: RecoveryCodesPanelProps) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const text = () => recoveryCodesText(user?.email ?? '', codes, new Date());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codes.join('\n'));
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), COPIED_MS);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div data-testid="recovery-codes-panel">
      <p role="alert" className="mb-4 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/30 px-3 py-2 text-sm text-amber-900 dark:text-amber-200">
        Save these codes now. They are shown only once. Each works once.
      </p>
      <ul className="grid grid-cols-2 gap-2 mb-4 font-mono text-sm text-gray-900 dark:text-gray-100">
        {codes.map(code => (
          <li key={code} data-testid="recovery-code" className="rounded bg-gray-100 dark:bg-gray-800 px-3 py-1.5 select-all">
            {code}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        <button type="button" data-testid="recovery-codes-download" className={secondaryButtonClass}
          onClick={() => downloadRecoveryCodes(text())}>
          Download
        </button>
        <button type="button" data-testid="recovery-codes-copy" className={secondaryButtonClass} onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button type="button" data-testid="recovery-codes-done" className={primaryButtonClass} onClick={onDone}>
          I have saved my codes
        </button>
      </div>
    </div>
  );
}
