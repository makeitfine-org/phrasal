import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "back" section definitions', () => {
  it('renders definition for retreating or moving backwards', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To retreat or move backwards \(often military or strategic\)\./i)).toBeInTheDocument();
  });

  it('renders definition for relying on a backup plan', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To rely on something as a backup plan when other things fail \(fall back on\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To retreat or move backwards \(often military or strategic\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To retreat or move backwards \(often military or strategic\)\./i)).toHaveAttribute(
      'title',
      'To retreat or move backwards (often military or strategic).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'fallBack_section_expanded', /To retreat or move backwards \(often military or strategic\)\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'fallBack', /To retreat or move backwards \(often military or strategic\)\./i, /Our competitors pushed hard, forcing us to fall back and rethink our strategy\./i, renderPage, getCard);
