import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "on" section definitions', () => {
  it('renders definition for spending time improving or developing something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To spend time repairing, improving, or developing something\./i)).toBeInTheDocument();
  });

  it('renders definition for trying to persuade someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To try to persuade or influence someone to do something\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/To spend time repairing, improving, or developing something\./i),
      screen.getByText(/To try to persuade or influence someone to do something\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To spend time repairing, improving, or developing something\./i)).toHaveAttribute(
      'title',
      'To spend time repairing, improving, or developing something.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To try to persuade or influence someone to do something\./i)).toHaveAttribute(
      'title',
      'To try to persuade or influence someone to do something.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'workOn_section_expanded', /To spend time repairing, improving, or developing something\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'workOn', /To spend time repairing, improving, or developing something\./i, /She is working on her pronunciation to sound more fluent\./i, renderPage, getCard);
