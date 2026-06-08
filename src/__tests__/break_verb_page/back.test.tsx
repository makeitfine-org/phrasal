import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "back" section definitions', () => {
  it('renders definition for regaining a lost advantage in sports', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To regain a lost advantage \(specifically in sports like tennis\)/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To regain a lost advantage \(specifically in sports like tennis\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To regain a lost advantage \(specifically in sports like tennis\)/i)).toHaveAttribute(
      'title',
      'To regain a lost advantage (specifically in sports like tennis).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'breakBack_section_expanded', /To regain a lost advantage \(specifically in sports like tennis\)/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'breakBack', /To regain a lost advantage \(specifically in sports like tennis\)/i, /He lost his serve in the first set/i, renderPage, getCard);
