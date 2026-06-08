import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "back" section definitions', () => {
  it('renders definition for returning', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return\./i)).toHaveAttribute('title', 'To return.');
  });
});

describeSectionToggle(LABEL, 'back', 'beBack_section_expanded', /To return\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'beBack', /To return\./i, /I will be back at my desk in ten minutes/i, renderPage, getCard);
