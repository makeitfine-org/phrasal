import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "across" section definitions', () => {
  it('renders definition for finding something by chance', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To find something or meet someone by chance/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To find something or meet someone by chance/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To find something or meet someone by chance/i)).toHaveAttribute(
      'title',
      'To find something or meet someone by chance.'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'runAcross_section_expanded', /To find something or meet someone by chance/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'runAcross', /To find something or meet someone by chance/i, /I ran across an old Java library/i, renderPage, getCard);
