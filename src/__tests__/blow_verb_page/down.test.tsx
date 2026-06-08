import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "down" section definitions', () => {
  it('renders definition for making something fall', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make something fall to the ground using strong wind\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make something fall to the ground using strong wind\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make something fall to the ground using strong wind\./i)).toHaveAttribute(
      'title',
      'To make something fall to the ground using strong wind.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'blowDown_section_expanded', /To make something fall to the ground using strong wind\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'blowDown', /To make something fall to the ground using strong wind\./i, /The storm blew down several trees/i, renderPage, getCard);
