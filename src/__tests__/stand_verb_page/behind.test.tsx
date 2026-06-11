import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "behind" section definitions', () => {
  it('renders definition for supporting someone or guaranteeing quality', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To support someone or guarantee the quality of something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To support someone or guarantee the quality of something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To support someone or guarantee the quality of something\./i)).toHaveAttribute(
      'title',
      'To support someone or guarantee the quality of something.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'standBehind_section_expanded', /To support someone or guarantee the quality of something\./i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'standBehind', /To support someone or guarantee the quality of something\./i, /We stand behind the quality of our Java software products\./i, renderPage, getCard);
