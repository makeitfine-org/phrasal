import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "together" section definitions', () => {
  it('renders definition for connecting items with interlocking zippers', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To connect two separate items using their interlocking zippers\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    const def = screen.getByText(/To connect two separate items using their interlocking zippers\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To connect two separate items using their interlocking zippers\./i)).toHaveAttribute(
      'title',
      'To connect two separate items using their interlocking zippers.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'zipTogether_section_expanded', /To connect two separate items using their interlocking zippers\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'zipTogether', /To connect two separate items using their interlocking zippers\./i, /We zipped together our two sleeping bags to make one large bed for the camping trip\./i, renderPage, getCard);
