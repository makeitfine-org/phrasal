import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FigureVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FigureVerbPage — "for" section definitions', () => {
  it('renders definition for expecting someone to be a certain type of person', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To expect someone to be a certain type of person, or to make an assumption about their character\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To expect someone to be a certain type of person, or to make an assumption about their character\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To expect someone to be a certain type of person, or to make an assumption about their character\./i)).toHaveAttribute(
      'title',
      'To expect someone to be a certain type of person, or to make an assumption about their character.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'figureFor_section_expanded', /To expect someone to be a certain type of person, or to make an assumption about their character\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'figureFor', /To expect someone to be a certain type of person, or to make an assumption about their character\./i, /I figured him for a strict leader, but he is actually very relaxed\./i, renderPage, getCard);
