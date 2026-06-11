import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "out" section definitions', () => {
  it('renders definition for being easy to see or notice', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be very easy to see or notice\./i)).toBeInTheDocument();
  });

  it('renders definition for being much better than others', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be much better than others\./i)).toBeInTheDocument();
  });

  it('renders definition for stubbornly resisting', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stubbornly resist or hold out for a better offer\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be very easy to see or notice\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be much better than others\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To stubbornly resist or hold out for a better offer\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be very easy to see or notice\./i)).toHaveAttribute(
      'title',
      'To be very easy to see or notice.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'standOut_section_expanded', /To be very easy to see or notice\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'standOut', /To be very easy to see or notice\./i, /The red button stands out against the dark background of the app\./i, renderPage, getCard);
