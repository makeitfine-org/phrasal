import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "over" section definitions', () => {
  it('renders definition for overwriting computer data', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To replace old computer data with new data; to overwrite\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    const def = screen.getByText(/To replace old computer data with new data; to overwrite\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To replace old computer data with new data; to overwrite\./i)).toHaveAttribute(
      'title',
      'To replace old computer data with new data; to overwrite.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'writeOver_section_expanded', /To replace old computer data with new data; to overwrite\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'writeOver', /To replace old computer data with new data; to overwrite\./i, /Be careful when saving the document, or you might write over yesterday's work\./i, renderPage, getCard);
