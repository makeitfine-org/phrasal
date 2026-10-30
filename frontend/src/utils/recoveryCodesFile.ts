export const RECOVERY_CODES_FILE_NAME = 'phrasal-recovery-codes.txt';

export function recoveryCodesText(email: string, codes: string[], now: Date): string {
  const header =
    `Phrasal recovery codes for ${email}, created ${now.toISOString().slice(0, 10)}; each code works once.`;
  return [header, '', ...codes, ''].join('\n');
}

export function downloadRecoveryCodes(text: string): void {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = RECOVERY_CODES_FILE_NAME;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
