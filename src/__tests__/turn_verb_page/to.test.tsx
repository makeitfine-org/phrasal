import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "to" section definitions', () => {
  it('renders definition for seeking help or comfort', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To go to someone or something for help, advice, or comfort\./i)).toBeInTheDocument();
  });

  it('renders definition for starting a coping habit', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start doing a particular activity or habit, often a negative one, to cope with stress\./i)).toBeInTheDocument();
  });

  it('renders definition for directing attention', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To direct your attention to a new topic or to a specific page\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To go to someone or something for help, advice, or comfort\./i),
      screen.getByText(/To start doing a particular activity or habit, often a negative one, to cope with stress\./i),
      screen.getByText(/To direct your attention to a new topic or to a specific page\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To go to someone or something for help, advice, or comfort\./i)).toHaveAttribute(
      'title',
      'To go to someone or something for help, advice, or comfort.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start doing a particular activity or habit, often a negative one, to cope with stress\./i)).toHaveAttribute(
      'title',
      'To start doing a particular activity or habit, often a negative one, to cope with stress.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To direct your attention to a new topic or to a specific page\./i)).toHaveAttribute(
      'title',
      'To direct your attention to a new topic or to a specific page.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'turnTo_section_expanded', /To go to someone or something for help, advice, or comfort\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'turnTo', /To go to someone or something for help, advice, or comfort\./i, /When I have a problem, I always turn to my best friend\./i, renderPage, getCard);
