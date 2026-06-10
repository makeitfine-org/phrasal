import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HandVerbPage — "to" section definitions', () => {
  it('renders definition for the phrase "have to hand it to someone"', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/Used in the phrase "have to hand it to someone"/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/Used in the phrase "have to hand it to someone"/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/Used in the phrase "have to hand it to someone"/i)).toHaveAttribute(
      'title',
      'Used in the phrase "have to hand it to someone" — to admit that someone has done something very well and give them credit for it.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'handTo_section_expanded', /Used in the phrase "have to hand it to someone"/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'handTo', /Used in the phrase "have to hand it to someone"/i, /You have to hand it to her; she managed that difficult software project perfectly\./i, renderPage, getCard);
