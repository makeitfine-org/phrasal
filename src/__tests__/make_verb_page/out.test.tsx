import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'MakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'out', 'makeOut_section_expanded', /To manage to see, hear, or read something with difficulty/i, renderPage);

describe(`${LABEL} — "out" section independence`, () => {
  it('collapsing "out" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('into');
    expandSection('out');
    fireEvent.click(screen.getByText('out'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
    expect(screen.getByText(/To change or transform something into something else/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'out', renderPage);

describe('MakeVerbPage — "out" section definitions', () => {
  it('all 6 "out" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To manage to see, hear, or read something with difficulty/i)).toHaveClass('truncate');
    expect(screen.getByText(/To understand someone's character/i)).toHaveClass('truncate');
    expect(screen.getByText(/To write all the necessary information on an official document/i)).toHaveClass('truncate');
    expect(screen.getByText(/To claim or pretend that something is true/i)).toHaveClass('truncate');
    expect(screen.getByText(/To progress, perform, or succeed in a situation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To kiss and touch romantically/i)).toHaveClass('truncate');
  });

  it('all 6 "out" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To manage to see, hear, or read something with difficulty/i))
      .toHaveAttribute('title', 'To manage to see, hear, or read something with difficulty');
    expect(screen.getByText(/To understand someone's character/i))
      .toHaveAttribute('title', "To understand someone's character or a situation");
    expect(screen.getByText(/To write all the necessary information on an official document/i))
      .toHaveAttribute('title', 'To write all the necessary information on an official document (like a check or invoice)');
    expect(screen.getByText(/To claim or pretend that something is true/i))
      .toHaveAttribute('title', 'To claim or pretend that something is true');
    expect(screen.getByText(/To progress, perform, or succeed in a situation/i))
      .toHaveAttribute('title', 'To progress, perform, or succeed in a situation');
    expect(screen.getByText(/To kiss and touch romantically/i))
      .toHaveAttribute('title', 'To kiss and touch romantically (informal)');
  });
});

describe('MakeVerbPage — "out" card view (default image)', () => {
  it('all 6 examples visible without expanding cards', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/"I could not make out the error message/i)).toBeInTheDocument();
    expect(screen.getByText(/"He is a very quiet team leader/i)).toBeInTheDocument();
    expect(screen.getByText(/"Please make the invoice out/i)).toBeInTheDocument();
    expect(screen.getByText(/"The software vendor made out/i)).toBeInTheDocument();
    expect(screen.getByText(/"How did you make out with/i)).toBeInTheDocument();
    expect(screen.getByText(/"The teenagers were making out/i)).toBeInTheDocument();
  });

  it('first "out" card has cursor-default class', () => {
    renderPage();
    expandSection('out');
    expect(getCard(/To manage to see, hear, or read something with difficulty/i)).toHaveClass('cursor-default');
  });

  it('no "out" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('out');
    fireEvent.click(getCard(/To manage to see, hear, or read something with difficulty/i));
    fireEvent.click(getCard(/To understand someone's character/i));
    fireEvent.click(getCard(/To write all the necessary information on an official document/i));
    fireEvent.click(getCard(/To claim or pretend that something is true/i));
    fireEvent.click(getCard(/To progress, perform, or succeed in a situation/i));
    fireEvent.click(getCard(/To kiss and touch romantically/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking card does not save to localStorage', () => {
    renderPage();
    expandSection('out');
    fireEvent.click(getCard(/To manage to see, hear, or read something with difficulty/i));
    expect(localStorage.getItem('makeOut_meaning_1_collapsed')).toBeNull();
  });

  it('card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('out');
    const card = getCard(/To manage to see, hear, or read something with difficulty/i);
    expect(within(card).getByText(/"I could not make out the error message/i))
      .toHaveAttribute('title', '"I could not make out the error message on the monitor because the screen was too bright."');
  });
});
