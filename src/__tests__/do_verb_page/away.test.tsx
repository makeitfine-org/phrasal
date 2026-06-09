import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "away" section definitions', () => {
  it('renders definition for abolishing or getting rid of something', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To abolish, get rid of, or stop using something\./i)).toBeInTheDocument();
  });

  it('renders definition for killing someone or an animal', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To kill someone or an animal \(informal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To abolish, get rid of, or stop using something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To abolish, get rid of, or stop using something\./i)).toHaveAttribute(
      'title',
      'To abolish, get rid of, or stop using something.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'doAway_section_expanded', /To abolish, get rid of, or stop using something\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'doAway', /To abolish, get rid of, or stop using something\./i, /do away with paper receipts/i, renderPage, getCard);
