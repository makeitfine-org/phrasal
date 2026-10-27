import { readCookie } from '../../utils/cookies';

const NAMES = ['XSRF-TOKEN', 'token', 'prefixed-id', 'first', 'second', 'third'];

function clearCookies() {
  NAMES.forEach((name) => {
    document.cookie = `${name}=; max-age=0; path=/`;
  });
}

describe('readCookie', () => {
  afterEach(clearCookies);

  it('returns the value of an existing cookie', () => {
    document.cookie = 'XSRF-TOKEN=abc123; path=/';
    expect(readCookie('XSRF-TOKEN')).toBe('abc123');
  });

  it('returns null when the cookie is missing', () => {
    expect(readCookie('missing')).toBeNull();
  });

  it('decodes a URL-encoded value', () => {
    document.cookie = 'token=a%3Db%20c; path=/';
    expect(readCookie('token')).toBe('a=b c');
  });

  it('finds the right cookie among several', () => {
    document.cookie = 'first=1; path=/';
    document.cookie = 'second=2; path=/';
    document.cookie = 'third=3; path=/';
    expect(readCookie('second')).toBe('2');
  });

  it('does not match a cookie whose name only ends with the requested name', () => {
    document.cookie = 'prefixed-id=x; path=/';
    expect(readCookie('id')).toBeNull();
  });
});
