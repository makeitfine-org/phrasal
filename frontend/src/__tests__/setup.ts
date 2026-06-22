import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

// jsdom doesn't implement scrollIntoView
window.HTMLElement.prototype.scrollIntoView = function() {};

// Reliable localStorage mock (jsdom's built-in can be missing .clear in some versions)
const localStorageMock: Storage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string): void => { store[key] = String(value); },
    removeItem: (key: string): void => { delete store[key]; },
    clear: (): void => { store = {}; },
    get length(): number { return Object.keys(store).length; },
    key: (index: number): string | null => Object.keys(store)[index] ?? null,
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});
