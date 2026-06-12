import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "through" section definitions', () => {
  it('renders definition for completing a task very quickly', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To do, read, or complete a task very quickly and with ease\./i)).toBeInTheDocument();
  });

  it('renders definition for travelling through without stopping', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To travel through a place without stopping, or to navigate a physical space rapidly\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    const defs = [
      screen.getByText(/To do, read, or complete a task very quickly and with ease\./i),
      screen.getByText(/To travel through a place without stopping, or to navigate a physical space rapidly\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To do, read, or complete a task very quickly and with ease\./i)).toHaveAttribute(
      'title',
      'To do, read, or complete a task very quickly and with ease.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To travel through a place without stopping, or to navigate a physical space rapidly\./i)).toHaveAttribute(
      'title',
      'To travel through a place without stopping, or to navigate a physical space rapidly.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'zipThrough_section_expanded', /To do, read, or complete a task very quickly and with ease\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'zipThrough', /To do, read, or complete a task very quickly and with ease\./i, /She zipped through the exam in half the allotted time\./i, renderPage, getCard);
