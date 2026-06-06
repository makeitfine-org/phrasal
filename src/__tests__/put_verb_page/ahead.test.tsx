import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'ahead', 'putAhead_section_expanded', /To give someone an advantage over others/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describe('PutVerbPage — "ahead" card view (default image)', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/"Learning Java will really put you ahead in the job market\."/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('ahead');
    expect(getCard(/To give someone an advantage over others/i)).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('ahead');
    fireEvent.click(getCard(/To give someone an advantage over others/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
