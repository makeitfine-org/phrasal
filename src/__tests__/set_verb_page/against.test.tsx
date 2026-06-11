import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "against" section definitions', () => {
  it('renders definition for making people or groups oppose each other', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make people or groups oppose or hate each other\./i)).toBeInTheDocument();
  });

  it('renders definition for balancing one thing against another', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To balance one thing against another/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make people or groups oppose or hate each other\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make people or groups oppose or hate each other\./i)).toHaveAttribute(
      'title',
      'To make people or groups oppose or hate each other.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'setAgainst_section_expanded', /To make people or groups oppose or hate each other\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'setAgainst', /To make people or groups oppose or hate each other\./i, /Poor leadership set the development team against the testing team\./i, renderPage, getCard);
