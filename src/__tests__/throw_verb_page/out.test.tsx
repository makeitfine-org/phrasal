import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThrowVerbPage — "out" section definitions', () => {
  it('renders definition for discarding as trash', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discard or dispose of something as trash\./i)).toBeInTheDocument();
  });

  it('renders definition for evicting someone', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To evict or expel someone from a place\./i)).toBeInTheDocument();
  });

  it('renders definition for rejecting or dismissing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To reject or dismiss/i)).toBeInTheDocument();
  });

  it('renders definition for emitting or radiating', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To emit or radiate/i)).toBeInTheDocument();
  });

  it('renders definition for offering an idea for consideration', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To offer an idea or suggestion for consideration\./i)).toBeInTheDocument();
  });

  it('renders definition for confusing someone causing a mistake', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To confuse someone or cause them to make a mistake/i)).toBeInTheDocument();
  });

  it('all 6 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To discard or dispose of something as trash\./i),
      screen.getByText(/To evict or expel someone from a place\./i),
      screen.getByText(/To reject or dismiss/i),
      screen.getByText(/To emit or radiate/i),
      screen.getByText(/To offer an idea or suggestion for consideration\./i),
      screen.getByText(/To confuse someone or cause them to make a mistake/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discard or dispose of something as trash\./i)).toHaveAttribute(
      'title',
      'To discard or dispose of something as trash.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To evict or expel someone from a place\./i)).toHaveAttribute(
      'title',
      'To evict or expel someone from a place.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To reject or dismiss/i)).toHaveAttribute(
      'title',
      'To reject or dismiss (a plan, idea, or legal case).'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To emit or radiate/i)).toHaveAttribute(
      'title',
      'To emit or radiate (light, heat, smoke).'
    );
  });

  it('fifth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To offer an idea or suggestion for consideration\./i)).toHaveAttribute(
      'title',
      'To offer an idea or suggestion for consideration.'
    );
  });

  it('sixth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To confuse someone or cause them to make a mistake/i)).toHaveAttribute(
      'title',
      'To confuse someone or cause them to make a mistake (chiefly British).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'throwOut_section_expanded', /To discard or dispose of something as trash\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'throwOut', /To discard or dispose of something as trash\./i, /It's time to throw out all these old magazines\./i, renderPage, getCard);
