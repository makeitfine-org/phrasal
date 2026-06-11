import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "against" section definitions', () => {
  it('renders definition for competing in an election or business contest', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To compete with someone in an election/i)).toBeInTheDocument();
  });

  it('renders definition for causing difficulties or opposing principles', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To cause difficulties or oppose principles/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To compete with someone in an election/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To compete with someone in an election/i)).toHaveAttribute(
      'title',
      'To compete with someone in an election or business contest.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'runAgainst_section_expanded', /To compete with someone in an election/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'runAgainst', /To compete with someone in an election/i, /Our product is running against two major competitors/i, renderPage, getCard);
