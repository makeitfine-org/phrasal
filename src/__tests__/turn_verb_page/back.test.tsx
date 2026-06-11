import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "back" section definitions', () => {
  it('renders definition for returning because of a problem', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return the way you came, usually because of a problem\./i)).toBeInTheDocument();
  });

  it('renders definition for reversing a process', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reverse a process or return to a previous state\./i)).toBeInTheDocument();
  });

  it('renders definition for folding back a cover', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To fold back a cover or page\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    const defs = [
      screen.getByText(/To return the way you came, usually because of a problem\./i),
      screen.getByText(/To reverse a process or return to a previous state\./i),
      screen.getByText(/To fold back a cover or page\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return the way you came, usually because of a problem\./i)).toHaveAttribute(
      'title',
      'To return the way you came, usually because of a problem.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reverse a process or return to a previous state\./i)).toHaveAttribute(
      'title',
      'To reverse a process or return to a previous state.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To fold back a cover or page\./i)).toHaveAttribute(
      'title',
      'To fold back a cover or page.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'turnBack_section_expanded', /To return the way you came, usually because of a problem\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'turnBack', /To return the way you came, usually because of a problem\./i, /The snowstorm was so heavy that we had to turn back\./i, renderPage, getCard);
