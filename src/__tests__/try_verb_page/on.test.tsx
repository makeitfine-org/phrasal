import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TryVerbPage — "on" section definitions', () => {
  it('renders definition for putting on clothing to check fit', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on an item of clothing/i)).toBeInTheDocument();
  });

  it('renders definition for attempting to deceive someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attempt to deceive someone/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/To put on an item of clothing/i),
      screen.getByText(/To attempt to deceive someone/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on an item of clothing/i)).toHaveAttribute(
      'title',
      'To put on an item of clothing or accessories to see if it fits or looks good before buying or wearing it.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attempt to deceive someone/i)).toHaveAttribute(
      'title',
      'To attempt to deceive someone or test someone\'s boundaries to see what you can get away with (primarily British/Australian English, "try it on").'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'tryOn_section_expanded', /To put on an item of clothing/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'tryOn', /To put on an item of clothing/i, /I need to try on this blazer/i, renderPage, getCard);
