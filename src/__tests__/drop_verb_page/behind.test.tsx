import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "behind" section definitions', () => {
  it('renders definition for failing to keep up with others', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fail to keep up with others; to fall behind a schedule\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fail to keep up with others; to fall behind a schedule\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fail to keep up with others; to fall behind a schedule\./i)).toHaveAttribute(
      'title',
      'To fail to keep up with others; to fall behind a schedule.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'dropBehind_section_expanded', /To fail to keep up with others; to fall behind a schedule\./i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'dropBehind', /To fail to keep up with others; to fall behind a schedule\./i, /We have dropped behind schedule/i, renderPage, getCard);
