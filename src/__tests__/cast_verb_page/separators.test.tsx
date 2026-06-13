import { renderPage } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('CastVerbPage — separators', () => {
  it('renders 8 hr separators', () => {
    const { container } = renderPage();
    const hrs = container.querySelectorAll('hr');
    expect(hrs).toHaveLength(8);
  });

  it('all hr separators have border-gray-600 class', () => {
    const { container } = renderPage();
    const hrs = container.querySelectorAll('hr');
    hrs.forEach(hr => {
      expect(hr.className).toMatch(/border-gray-600/);
    });
  });
});
