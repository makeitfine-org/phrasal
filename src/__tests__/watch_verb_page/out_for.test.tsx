import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WatchVerbPage — "out for" section definitions', () => {
  it('renders definition for being alert to danger or presence', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To be alert to the danger or presence of something or someone\./i)).toBeInTheDocument();
  });

  it('renders definition for protecting someone', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To protect someone or look after their best interests\./i)).toBeInTheDocument();
  });

  it('renders definition for waiting expectantly for something', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To wait expectantly for something to arrive or appear\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out for');
    const defs = [
      screen.getByText(/To be alert to the danger or presence of something or someone\./i),
      screen.getByText(/To protect someone or look after their best interests\./i),
      screen.getByText(/To wait expectantly for something to arrive or appear\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To be alert to the danger or presence of something or someone\./i)).toHaveAttribute(
      'title',
      'To be alert to the danger or presence of something or someone.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To protect someone or look after their best interests\./i)).toHaveAttribute(
      'title',
      'To protect someone or look after their best interests.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To wait expectantly for something to arrive or appear\./i)).toHaveAttribute(
      'title',
      'To wait expectantly for something to arrive or appear.'
    );
  });
});

describeSectionToggle(LABEL, 'out for', 'watchOutFor_section_expanded', /To be alert to the danger or presence of something or someone\./i, renderPage);

describeChevronAndColour(LABEL, 'out for', renderPage);

describeDefaultImageCards(LABEL, 'out for', 'watchOutFor', /To be alert to the danger or presence of something or someone\./i, /If you go hiking in those woods, watch out for bears\./i, renderPage, getCard);
