import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "off" section definitions', () => {
  it('renders definition for leaving', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave\./i)).toBeInTheDocument();
  });

  it('renders definition for being canceled', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To be canceled\./i)).toBeInTheDocument();
  });

  it('renders definition for being absent from work', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To be absent from work\./i)).toBeInTheDocument();
  });

  it('renders definition for going bad (food)', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To go bad \(for food\)\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be canceled\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be absent from work\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To go bad \(for food\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave\./i)).toHaveAttribute('title', 'To leave.');
  });
});

describeSectionToggle(LABEL, 'off', 'beOff_section_expanded', /To leave\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'beOff', /To leave\./i, /I am off to the management conference now/i, renderPage, getCard);
