import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BuildVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BuildVerbPage — "around / round" section definitions', () => {
  it('renders definition for basing a strategy on a concept', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To base a strategy, system, plan, or team on a central person, idea, or concept\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To base a strategy, system, plan, or team on a central person, idea, or concept\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To base a strategy, system, plan, or team on a central person, idea, or concept\./i)).toHaveAttribute(
      'title',
      'To base a strategy, system, plan, or team on a central person, idea, or concept.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'buildAround_section_expanded', /To base a strategy, system, plan, or team on a central person, idea, or concept\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'buildAround', /To base a strategy, system, plan, or team on a central person, idea, or concept\./i, /build the new marketing strategy around customer retention/i, renderPage, getCard);
