import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "over" section definitions', () => {
  it('renders definition for giving someone authority or power over someone else', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give someone authority or power over someone else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give someone authority or power over someone else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give someone authority or power over someone else\./i)).toHaveAttribute(
      'title',
      'To give someone authority or power over someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'setOver_section_expanded', /To give someone authority or power over someone else\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'setOver', /To give someone authority or power over someone else\./i, /She was set over the entire IT department after the reorganization\./i, renderPage, getCard);
