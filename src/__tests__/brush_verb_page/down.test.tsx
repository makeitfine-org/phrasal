import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BrushVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BrushVerbPage — "down" section definitions', () => {
  it('renders definition for cleaning from top to bottom', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To clean someone or something by brushing them from top to bottom\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To clean someone or something by brushing them from top to bottom\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To clean someone or something by brushing them from top to bottom\./i)).toHaveAttribute(
      'title',
      'To clean someone or something by brushing them from top to bottom.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'brushDown_section_expanded', /To clean someone or something by brushing them from top to bottom\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'brushDown', /To clean someone or something by brushing them from top to bottom\./i, /The rider brushed down the horse after the race/i, renderPage, getCard);
