import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "down" section definitions', () => {
  it('renders definition for giving knowledge to younger generations', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To give knowledge, skills, or items to younger generations or junior members/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To give knowledge, skills, or items to younger generations or junior members/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To give knowledge, skills, or items to younger generations or junior members/i)).toHaveAttribute(
      'title',
      'To give knowledge, skills, or items to younger generations or junior members.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'passDown_section_expanded', /To give knowledge, skills, or items to younger generations or junior members/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'passDown', /To give knowledge, skills, or items to younger generations or junior members/i, /The senior manager passed down her negotiation skills to the new team members\./i, renderPage, getCard);
