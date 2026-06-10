import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "against" section definitions', () => {
  it('renders definition for resisting a force', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To resist or oppose a force/i)).toBeInTheDocument();
  });

  it('renders definition for working in opposition to someone', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To work in opposition to someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To resist or oppose a force/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To resist or oppose a force/i)).toHaveAttribute(
      'title',
      'To resist or oppose a force.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'pullAgainst_section_expanded', /To resist or oppose a force/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'pullAgainst', /To resist or oppose a force/i, /The dog kept pulling against the leash/i, renderPage, getCard);
