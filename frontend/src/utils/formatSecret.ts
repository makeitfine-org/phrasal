const GROUP_SIZE = 4;

/** Groups the key in fours so it is easy to type into an authenticator app. */
export function formatSecret(secret: string): string {
  return secret.match(new RegExp(`.{1,${GROUP_SIZE}}`, 'g'))?.join(' ') ?? '';
}
