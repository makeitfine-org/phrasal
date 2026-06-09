import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "for" section definitions', () => {
  it('renders definition for being tricked or deceived', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be tricked or deceived by a lie or scam\./i)).toBeInTheDocument();
  });

  it('renders definition for falling in love', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To fall deeply in love with someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be tricked or deceived by a lie or scam\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be tricked or deceived by a lie or scam\./i)).toHaveAttribute(
      'title',
      'To be tricked or deceived by a lie or scam.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'fallFor_section_expanded', /To be tricked or deceived by a lie or scam\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'fallFor', /To be tricked or deceived by a lie or scam\./i, /I can't believe the manager fell for that obvious phishing email\./i, renderPage, getCard);
