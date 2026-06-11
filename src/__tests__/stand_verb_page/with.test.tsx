import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "with" section definitions', () => {
  it('renders definition for expressing solidarity or support', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To express solidarity or support for someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To express solidarity or support for someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To express solidarity or support for someone\./i)).toHaveAttribute(
      'title',
      'To express solidarity or support for someone.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'standWith_section_expanded', /To express solidarity or support for someone\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'standWith', /To express solidarity or support for someone\./i, /We stand with our colleagues in the overseas office during their difficult time\./i, renderPage, getCard);
