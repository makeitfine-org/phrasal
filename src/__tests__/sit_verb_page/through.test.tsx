import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SitVerbPage — "through" section definitions', () => {
  it('renders definition for staying until the end of a difficult event', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To stay until the end of an event that is long, boring, or difficult\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To stay until the end of an event that is long, boring, or difficult\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To stay until the end of an event that is long, boring, or difficult\./i)).toHaveAttribute(
      'title',
      'To stay until the end of an event that is long, boring, or difficult.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'sitThrough_section_expanded', /To stay until the end of an event that is long, boring, or difficult\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'sitThrough', /To stay until the end of an event that is long, boring, or difficult\./i, /I had to sit through a three-hour presentation on software compliance\./i, renderPage, getCard);
