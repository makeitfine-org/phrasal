import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "together" section definitions', () => {
  it('renders definition for uniting people or groups', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To help people or groups to become friendly, collaborate, or unite/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To help people or groups to become friendly, collaborate, or unite/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To help people or groups to become friendly, collaborate, or unite/i)).toHaveAttribute(
      'title',
      'To help people or groups to become friendly, collaborate, or unite.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'bringTogether_section_expanded', /To help people or groups to become friendly, collaborate, or unite/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'bringTogether', /To help people or groups to become friendly, collaborate, or unite/i, /The project brought together software developers/i, renderPage, getCard);
