import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HoldVerbPage — "against" section definitions', () => {
  it('renders definition for holding a grudge', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To let a past mistake or negative action influence your opinion of someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To let a past mistake or negative action influence your opinion/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To let a past mistake or negative action influence your opinion/i)).toHaveAttribute(
      'title',
      'To let a past mistake or negative action influence your opinion of someone; to hold a grudge.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'holdAgainst_section_expanded', /To let a past mistake or negative action influence your opinion/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'holdAgainst', /To let a past mistake or negative action influence your opinion/i, /The developer made a major error in the code, but the manager did not hold it against him/i, renderPage, getCard);
