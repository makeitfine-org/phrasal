import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "around / round" section definitions', () => {
  it('renders definition for looking in various places', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To look in various places or ask several people for information/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To look in various places or ask several people for information/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To look in various places or ask several people for information/i)).toHaveAttribute(
      'title',
      'To look in various places or ask several people for information (often to compare prices or options).'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'checkAround_section_expanded', /To look in various places or ask several people for information/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'checkAround', /To look in various places or ask several people for information/i, /We should check around for a cheaper cloud hosting provider/i, renderPage, getCard);
