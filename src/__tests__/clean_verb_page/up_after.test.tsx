import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CleanVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CleanVerbPage — "up after" section definitions', () => {
  it('renders definition for removing mess created by someone else', () => {
    renderPage();
    expandSection('up after');
    expect(screen.getByText(/To remove the mess or dirt created by someone or something else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up after');
    expect(screen.getByText(/To remove the mess or dirt created by someone or something else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up after');
    expect(screen.getByText(/To remove the mess or dirt created by someone or something else\./i)).toHaveAttribute(
      'title',
      'To remove the mess or dirt created by someone or something else.'
    );
  });
});

describeSectionToggle(LABEL, 'up after', 'cleanUpAfter_section_expanded', /To remove the mess or dirt created by someone or something else\./i, renderPage);

describeChevronAndColour(LABEL, 'up after', renderPage);

describeDefaultImageCards(LABEL, 'up after', 'cleanUpAfter', /To remove the mess or dirt created by someone or something else\./i, /I am constantly cleaning up after my new puppy/i, renderPage, getCard);
