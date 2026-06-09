import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "around / round" section definitions', () => {
  it('renders definition for visiting someone informally', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To visit someone informally\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To visit someone informally\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To visit someone informally\./i)).toHaveAttribute(
      'title',
      'To visit someone informally.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'dropAround_section_expanded', /To visit someone informally\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'dropAround', /To visit someone informally\./i, /I will drop round the office/i, renderPage, getCard);
