import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StickVerbPage — "down" section definitions', () => {
  it('renders definition for attaching something to a surface', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To attach something to a surface using glue or tape\./i)).toBeInTheDocument();
  });

  it('renders definition for writing something quickly', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something quickly/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To attach something to a surface using glue or tape\./i),
      screen.getByText(/To write something quickly/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To attach something to a surface using glue or tape\./i)).toHaveAttribute(
      'title',
      'To attach something to a surface using glue or tape.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something quickly/i)).toHaveAttribute(
      'title',
      'To write something quickly (informal).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'stickDown_section_expanded', /To attach something to a surface using glue or tape\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'stickDown', /To attach something to a surface using glue or tape\./i, /Stick down the network cables so nobody trips in the server room\./i, renderPage, getCard);
