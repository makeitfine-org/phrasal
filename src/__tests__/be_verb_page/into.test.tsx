import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "into" section definitions', () => {
  it('renders definition for being very interested in something', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be very interested in something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be very interested in something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be very interested in something\./i)).toHaveAttribute(
      'title',
      'To be very interested in something.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'beInto_section_expanded', /To be very interested in something\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'beInto', /To be very interested in something\./i, /She is really into software architecture/i, renderPage, getCard);
