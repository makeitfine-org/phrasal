import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PickVerbPage — "over" section definitions', () => {
  it('renders definition for examining things to select the best ones', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To carefully examine a group of things to select the best ones/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To carefully examine a group of things to select the best ones/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To carefully examine a group of things to select the best ones/i)).toHaveAttribute(
      'title',
      'To carefully examine a group of things to select the best ones.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'pickOver_section_expanded', /To carefully examine a group of things to select the best ones/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'pickOver', /To carefully examine a group of things to select the best ones/i, /By the time I arrived at the market, the best fruit had already been picked over\./i, renderPage, getCard);
