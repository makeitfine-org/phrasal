import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SitVerbPage — "back" section definitions', () => {
  it('renders definition for relaxing in a chair', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To relax in a chair\./i)).toBeInTheDocument();
  });

  it('renders definition for intentionally taking no action', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To intentionally take no action when you should probably do something\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To relax in a chair\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To intentionally take no action when you should probably do something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To relax in a chair\./i)).toHaveAttribute(
      'title',
      'To relax in a chair.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'sitBack_section_expanded', /To relax in a chair\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'sitBack', /To relax in a chair\./i, /Now that the software release is finished, we can sit back and relax\./i, renderPage, getCard);
