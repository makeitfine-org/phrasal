import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThinkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThinkVerbPage — "about" section definitions', () => {
  it('renders definition for considering a person, thing, or idea', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To consider a person, thing, or idea/i)).toBeInTheDocument();
  });

  it('renders definition for holding a specific view or belief', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To hold a specific view or belief regarding a topic\./i)).toBeInTheDocument();
  });

  it('renders definition for recalling a memory', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To recall a memory or picture something in your mind\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about');
    const defs = [
      screen.getByText(/To consider a person, thing, or idea/i),
      screen.getByText(/To hold a specific view or belief regarding a topic\./i),
      screen.getByText(/To recall a memory or picture something in your mind\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To consider a person, thing, or idea/i)).toHaveAttribute(
      'title',
      'To consider a person, thing, or idea — to spend time examining an idea or focusing your mind on someone or something.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To hold a specific view or belief regarding a topic\./i)).toHaveAttribute(
      'title',
      'To hold a specific view or belief regarding a topic.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To recall a memory or picture something in your mind\./i)).toHaveAttribute(
      'title',
      'To recall a memory or picture something in your mind.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'thinkAbout_section_expanded', /To consider a person, thing, or idea/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'thinkAbout', /To consider a person, thing, or idea/i, /Give me a few days to think about your proposal\./i, renderPage, getCard);
