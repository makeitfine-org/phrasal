import { renderPage } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — separators', () => {
  it('renders 25 hr separators', () => {
    const { container } = renderPage();
    const hrs = container.querySelectorAll('hr');
    expect(hrs).toHaveLength(25);
  });

  it('all hr separators have border-gray-600 class', () => {
    const { container } = renderPage();
    const hrs = container.querySelectorAll('hr');
    hrs.forEach(hr => {
      expect(hr.className).toMatch(/border-gray-600/);
    });
  });
});
