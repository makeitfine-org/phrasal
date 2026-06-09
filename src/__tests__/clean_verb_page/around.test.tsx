import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CleanVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CleanVerbPage — "around" section definitions', () => {
  it('renders definition for washing the space near an object', () => {
    renderPage();
    expandSection('around');
    expect(screen.getByText(/To wash or tidy the space near an object without moving the object itself\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around');
    expect(screen.getByText(/To wash or tidy the space near an object without moving the object itself\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around');
    expect(screen.getByText(/To wash or tidy the space near an object without moving the object itself\./i)).toHaveAttribute(
      'title',
      'To wash or tidy the space near an object without moving the object itself.'
    );
  });
});

describeSectionToggle(LABEL, 'around', 'cleanAround_section_expanded', /To wash or tidy the space near an object without moving the object itself\./i, renderPage);

describeChevronAndColour(LABEL, 'around', renderPage);

describeDefaultImageCards(LABEL, 'around', 'cleanAround', /To wash or tidy the space near an object without moving the object itself\./i, /Don't worry about moving the heavy cabinet/i, renderPage, getCard);
