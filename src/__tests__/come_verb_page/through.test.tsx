import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "through" section definitions', () => {
  it('renders definition for surviving a difficult situation', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To successfully complete or survive a difficult situation/i)).toBeInTheDocument();
  });

  it('renders definition for delivering what was promised', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To deliver what was promised or expected/i)).toBeInTheDocument();
  });

  it('renders definition for being approved or arriving', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be approved or to arrive \(official documents, messages\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'through', 'comeThrough_section_expanded', /To successfully complete or survive a difficult situation/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'comeThrough', /To successfully complete or survive a difficult situation/i, /"Thanks to strong leadership, the company came through the financial crisis/i, renderPage, getCard);
