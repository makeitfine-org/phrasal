import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'ahead', 'putAhead_section_expanded', /To give someone an advantage over others/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describe('PutVerbPage — "ahead" card view', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/"Learning Java will really put you ahead in the job market\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('ahead');
    fireEvent.click(getCard(/To give someone an advantage over others/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'ahead', 'putAhead', /To give someone an advantage over others/i, /"Learning Java will really put you ahead/i, renderPage, getCard);
