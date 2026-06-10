import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "back" section definitions', () => {
  it('renders definition for retreating', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To retreat or move backwards/i)).toBeInTheDocument();
  });

  it('renders definition for deciding not to do something', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To decide not to do something you previously planned/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To retreat or move backwards/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To retreat or move backwards/i)).toHaveAttribute(
      'title',
      'To retreat or move backwards.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'pullBack_section_expanded', /To retreat or move backwards/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'pullBack', /To retreat or move backwards/i, /The army was ordered to pull back/i, renderPage, getCard);
