import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "out" section definitions', () => {
  it('renders definition for leaving home for a social event', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave home for a social event or activity/i)).toBeInTheDocument();
  });

  it('renders definition for stopping burning or shining', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop burning or shining \(fire or lights\)/i)).toBeInTheDocument();
  });

  it('renders definition for being published or sent', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be published, broadcast, or sent/i)).toBeInTheDocument();
  });

  it('renders definition for becoming unfashionable', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To become unfashionable or out of date/i)).toBeInTheDocument();
  });

  it('renders definition for having a romantic relationship', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To have a romantic relationship with someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'out', 'goOut_section_expanded', /To leave home for a social event or activity/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'goOut', /To leave home for a social event or activity/i, /"We are going out for dinner to celebrate/i, renderPage, getCard);
