import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "through" section definitions', () => {
  it('renders definition for dealing with a complex problem step by step', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To deal with, resolve, or overcome a complex problem or difficult emotion step by step\./i)).toBeInTheDocument();
  });

  it('renders definition for reading or completing a large amount of material', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To read, process, or complete a large amount of material from beginning to end\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    const defs = [
      screen.getByText(/To deal with, resolve, or overcome a complex problem or difficult emotion step by step\./i),
      screen.getByText(/To read, process, or complete a large amount of material from beginning to end\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To deal with, resolve, or overcome a complex problem or difficult emotion step by step\./i)).toHaveAttribute(
      'title',
      'To deal with, resolve, or overcome a complex problem or difficult emotion step by step.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To read, process, or complete a large amount of material from beginning to end\./i)).toHaveAttribute(
      'title',
      'To read, process, or complete a large amount of material from beginning to end.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'workThrough_section_expanded', /To deal with, resolve, or overcome a complex problem or difficult emotion step by step\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'workThrough', /To deal with, resolve, or overcome a complex problem or difficult emotion step by step\./i, /Couples counseling helped them work through their trust issues\./i, renderPage, getCard);
