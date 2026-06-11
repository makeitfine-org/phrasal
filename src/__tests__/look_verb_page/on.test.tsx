import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "on" section definitions', () => {
  it('renders definition for watching an event without taking part', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To watch an event happen without taking part in it\./i)).toBeInTheDocument();
  });

  it('renders definition for considering someone in a specific way', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To consider someone or something in a specific way\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/To watch an event happen without taking part in it\./i),
      screen.getByText(/To consider someone or something in a specific way\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To watch an event happen without taking part in it\./i)).toHaveAttribute(
      'title',
      'To watch an event happen without taking part in it.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To consider someone or something in a specific way\./i)).toHaveAttribute(
      'title',
      'To consider someone or something in a specific way.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'lookOn_section_expanded', /To watch an event happen without taking part in it\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'lookOn', /To watch an event happen without taking part in it\./i, /The manager looked on as the team/i, renderPage, getCard);
