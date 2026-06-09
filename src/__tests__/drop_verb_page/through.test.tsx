import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "through" section definitions', () => {
  it('renders definition for failing to happen or be completed', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To fail to happen or fail to be completed/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To fail to happen or fail to be completed/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To fail to happen or fail to be completed/i)).toHaveAttribute(
      'title',
      'To fail to happen or fail to be completed ("fall through" is much more common but "drop through" is sometimes used).'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'dropThrough_section_expanded', /To fail to happen or fail to be completed/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'dropThrough', /To fail to happen or fail to be completed/i, /The business merger dropped through/i, renderPage, getCard);
