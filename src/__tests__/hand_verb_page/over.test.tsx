import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HandVerbPage — "over" section definitions', () => {
  it('renders definition for giving control or responsibility to someone else', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give control, responsibility, or ownership of something to someone else\./i)).toBeInTheDocument();
  });

  it('renders definition for giving something because someone demands it', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give something to someone because they demand it/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give control, responsibility, or ownership of something to someone else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give control, responsibility, or ownership of something to someone else\./i)).toHaveAttribute(
      'title',
      'To give control, responsibility, or ownership of something to someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'handOver_section_expanded', /To give control, responsibility, or ownership of something to someone else\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'handOver', /To give control, responsibility, or ownership of something to someone else\./i, /When the project is finished, we will hand over the new application to the client\./i, renderPage, getCard);
