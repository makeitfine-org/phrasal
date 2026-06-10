import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HoldVerbPage — "in" section definitions', () => {
  it('renders definition for hiding emotions', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hide or control your emotions\./i)).toBeInTheDocument();
  });

  it('renders definition for pulling stomach inwards', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To pull your stomach inwards\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hide or control your emotions\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hide or control your emotions\./i)).toHaveAttribute(
      'title',
      'To hide or control your emotions.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'holdIn_section_expanded', /To hide or control your emotions\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'holdIn', /To hide or control your emotions\./i, /The CEO was furious about the delayed release, but she managed to hold in her anger\./i, renderPage, getCard);
