import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "back" section definitions', () => {
  it('renders definition for replying to a letter or email', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reply to someone's letter, email, or message\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    const def = screen.getByText(/To reply to someone's letter, email, or message\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reply to someone's letter, email, or message\./i)).toHaveAttribute(
      'title',
      "To reply to someone's letter, email, or message."
    );
  });
});

describeSectionToggle(LABEL, 'back', 'writeBack_section_expanded', /To reply to someone's letter, email, or message\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'writeBack', /To reply to someone's letter, email, or message\./i, /I sent him an email last week, but he still hasn't written back\./i, renderPage, getCard);
