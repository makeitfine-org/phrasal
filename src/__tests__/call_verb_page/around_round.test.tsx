import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "around / round" section definitions', () => {
  it('renders definition for telephoning several people', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To telephone several different people or companies/i)).toBeInTheDocument();
  });

  it('renders definition for visiting someone casually', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To visit someone's house casually\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To telephone several different people or companies/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To telephone several different people or companies/i)).toHaveAttribute(
      'title',
      'To telephone several different people or companies, usually to get information or compare prices.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'callAround_section_expanded', /To telephone several different people or companies/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'callAround', /To telephone several different people or companies/i, /call around to find a better price/i, renderPage, getCard);
