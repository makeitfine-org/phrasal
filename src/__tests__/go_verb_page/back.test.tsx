import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "back" section definitions', () => {
  it('renders definition for returning to a place or state', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a place or previous state/i)).toBeInTheDocument();
  });

  it('renders definition for having existed since a specific time', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To have existed or started since a specific time/i)).toBeInTheDocument();
  });

  it('renders definition for breaking a promise', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To break a promise or agreement/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'back', 'goBack_section_expanded', /To return to a place or previous state/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'goBack', /To return to a place or previous state/i, /"I need to go back to the office/i, renderPage, getCard);
