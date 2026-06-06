import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'by', 'putBy_section_expanded', /To save money for the future/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describe('PutVerbPage — "by" card view', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/"I try to put by some money each month for a new computer\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('by');
    fireEvent.click(getCard(/To save money for the future/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'by', 'putBy', /To save money for the future/i, /"I try to put by some money/i, renderPage, getCard);
