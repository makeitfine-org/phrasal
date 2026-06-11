import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StickVerbPage — "out" section definitions', () => {
  it('renders definition for being easy to see or notice', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be very easy to see or notice because of being different\./i)).toBeInTheDocument();
  });

  it('renders definition for continuing to the end of a difficult situation', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To continue to the end of a difficult situation/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To be very easy to see or notice because of being different\./i),
      screen.getByText(/To continue to the end of a difficult situation/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be very easy to see or notice because of being different\./i)).toHaveAttribute(
      'title',
      'To be very easy to see or notice because of being different.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To continue to the end of a difficult situation/i)).toHaveAttribute(
      'title',
      'To continue to the end of a difficult situation (used as "stick it out").'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'stickOut_section_expanded', /To be very easy to see or notice because of being different\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'stickOut', /To be very easy to see or notice because of being different\./i, /The memory leak in the backend logic really sticks out when you look at the server logs\./i, renderPage, getCard);
