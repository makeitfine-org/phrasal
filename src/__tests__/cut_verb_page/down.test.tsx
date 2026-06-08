import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "down" section definitions', () => {
  it('renders definition for felling by cutting', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To cause something to fall by cutting/i)).toBeInTheDocument();
  });

  it('renders definition for reducing amount or frequency', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the amount or frequency of something/i)).toBeInTheDocument();
  });

  it('renders definition for killing or severely injuring', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To kill or severely injure someone/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To cause something to fall by cutting/i)).toHaveClass('truncate');
    expect(screen.getByText(/To reduce the amount or frequency of something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To kill or severely injure someone/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To cause something to fall by cutting/i)).toHaveAttribute(
      'title',
      'To cause something to fall by cutting.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'cutDown_section_expanded', /To cause something to fall by cutting/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'cutDown', /To cause something to fall by cutting/i, /The city cut down the old oak tree/i, renderPage, getCard);
