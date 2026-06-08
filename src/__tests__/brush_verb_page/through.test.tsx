import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BrushVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BrushVerbPage — "through" section definitions', () => {
  it('renders definition for brushing completely through hair', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To move a brush completely through hair to remove knots\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To move a brush completely through hair to remove knots\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To move a brush completely through hair to remove knots\./i)).toHaveAttribute(
      'title',
      'To move a brush completely through hair to remove knots.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'brushThrough_section_expanded', /To move a brush completely through hair to remove knots\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'brushThrough', /To move a brush completely through hair to remove knots\./i, /brush through your hair quickly before the video call/i, renderPage, getCard);
