import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../');

// Mirrors the 404.html redirect script as a pure function.
function computeRedirectUrl(
  protocol: string, hostname: string, port: string,
  pathname: string, search: string, hash: string,
  pathSegmentsToKeep: number
): string {
  return (
    protocol + '//' + hostname + (port ? ':' + port : '') +
    pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
    pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
    (search ? '&' + search.slice(1).replace(/&/g, '~and~') : '') +
    hash
  );
}

// Mirrors the index.html restore script as a pure function.
function restorePathFromSearch(pathname: string, search: string, hash: string): string | null {
  if (search[1] !== '/') return null;
  const decoded = search.slice(1).split('&').map(s => s.replace(/~and~/g, '&')).join('?');
  return pathname.slice(0, -1) + decoded + hash;
}

describe('GitHub Pages SPA redirect — 404.html', () => {
  it('404.html exists in public/', () => {
    expect(() => readFileSync(resolve(root, 'public/404.html'), 'utf-8')).not.toThrow();
  });

  it('404.html uses pathSegmentsToKeep = 1', () => {
    const html = readFileSync(resolve(root, 'public/404.html'), 'utf-8');
    expect(html).toContain('pathSegmentsToKeep = 1');
  });

  it('redirects /phrasal/phrasal-verbs to /?/phrasal-verbs under /phrasal/', () => {
    const result = computeRedirectUrl(
      'https:', 'makeitfine-org.github.io', '',
      '/phrasal/phrasal-verbs', '', '', 1
    );
    expect(result).toBe('https://makeitfine-org.github.io/phrasal/?/phrasal-verbs');
  });

  it('preserves query string in redirect', () => {
    const result = computeRedirectUrl(
      'https:', 'makeitfine-org.github.io', '',
      '/phrasal/phrasal-verbs', '?foo=bar', '', 1
    );
    expect(result).toBe('https://makeitfine-org.github.io/phrasal/?/phrasal-verbs&foo=bar');
  });

  it('preserves hash in redirect', () => {
    const result = computeRedirectUrl(
      'https:', 'makeitfine-org.github.io', '',
      '/phrasal/phrasal-verbs', '', '#section', 1
    );
    expect(result).toBe('https://makeitfine-org.github.io/phrasal/?/phrasal-verbs#section');
  });
});

describe('GitHub Pages SPA redirect — index.html restore script', () => {
  it('index.html contains the path restoration script', () => {
    const html = readFileSync(resolve(root, 'index.html'), 'utf-8');
    expect(html).toContain("l.search[1] === '/'");
    expect(html).toContain('window.history.replaceState');
  });

  it('restores /phrasal/phrasal-verbs from ?/phrasal-verbs search param', () => {
    const result = restorePathFromSearch('/phrasal/', '?/phrasal-verbs', '');
    expect(result).toBe('/phrasal/phrasal-verbs');
  });

  it('returns null when search does not start with /', () => {
    expect(restorePathFromSearch('/phrasal/', '?foo=bar', '')).toBeNull();
    expect(restorePathFromSearch('/phrasal/', '', '')).toBeNull();
  });

  it('decodes ~and~ back to & in query strings', () => {
    const result = restorePathFromSearch('/phrasal/', '?/phrasal-verbs&a~and~b=1', '');
    expect(result).toBe('/phrasal/phrasal-verbs?a&b=1');
  });

  it('preserves hash when restoring', () => {
    const result = restorePathFromSearch('/phrasal/', '?/phrasal-verbs', '#top');
    expect(result).toBe('/phrasal/phrasal-verbs#top');
  });
});
