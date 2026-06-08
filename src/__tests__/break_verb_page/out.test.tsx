import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "out" section definitions', () => {
  it('renders definition for starting suddenly', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To start suddenly \(war, fire, disease, riots\)/i)).toBeInTheDocument();
  });

  it('renders definition for escaping from a place', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To escape from a place \(like a prison\)/i)).toBeInTheDocument();
  });

  it('renders definition for developing a skin condition', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To develop a skin condition/i)).toBeInTheDocument();
  });

  it('renders definition for bringing something out to celebrate', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To bring something out to use or celebrate with/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To start suddenly \(war, fire, disease, riots\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To escape from a place \(like a prison\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To develop a skin condition/i)).toHaveClass('truncate');
    expect(screen.getByText(/To bring something out to use or celebrate with/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To start suddenly \(war, fire, disease, riots\)/i)).toHaveAttribute(
      'title',
      'To start suddenly (war, fire, disease, riots).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'breakOut_section_expanded', /To start suddenly \(war, fire, disease, riots\)/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'breakOut', /To start suddenly \(war, fire, disease, riots\)/i, /World War II broke out in 1939/i, renderPage, getCard);
