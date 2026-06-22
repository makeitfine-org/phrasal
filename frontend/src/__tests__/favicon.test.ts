import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../');

describe('favicon', () => {
  it('index.html links to /favicon.svg with svg mime type', () => {
    const html = readFileSync(resolve(root, 'index.html'), 'utf-8');
    expect(html).toContain('<link rel="icon" type="image/svg+xml" href="/favicon.svg"');
  });

  it('favicon.svg exists in public/', () => {
    expect(() => readFileSync(resolve(root, 'public/favicon.svg'), 'utf-8')).not.toThrow();
  });

  it('favicon.svg is valid SVG with a viewBox', () => {
    const svg = readFileSync(resolve(root, 'public/favicon.svg'), 'utf-8');
    expect(svg).toMatch(/^<svg /);
    expect(svg).toContain('viewBox');
  });

  it('favicon.svg contains the Ph text mark', () => {
    const svg = readFileSync(resolve(root, 'public/favicon.svg'), 'utf-8');
    expect(svg).toContain('Ph');
  });

  it('favicon.svg uses brand blue fill', () => {
    const svg = readFileSync(resolve(root, 'public/favicon.svg'), 'utf-8');
    expect(svg).toContain('#3b82f6');
  });
});
