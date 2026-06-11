import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "against" section definitions', () => {
  it('renders definition for becoming hostile', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To suddenly become hostile toward someone or something\./i)).toBeInTheDocument();
  });

  it('renders definition for causing hostility', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To cause someone to be hostile toward another person\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('against');
    const defs = [
      screen.getByText(/To suddenly become hostile toward someone or something\./i),
      screen.getByText(/To cause someone to be hostile toward another person\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To suddenly become hostile toward someone or something\./i)).toHaveAttribute(
      'title',
      'To suddenly become hostile toward someone or something.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To cause someone to be hostile toward another person\./i)).toHaveAttribute(
      'title',
      'To cause someone to be hostile toward another person.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'turnAgainst_section_expanded', /To suddenly become hostile toward someone or something\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'turnAgainst', /To suddenly become hostile toward someone or something\./i, /The public turned against the mayor after the scandal broke\./i, renderPage, getCard);
