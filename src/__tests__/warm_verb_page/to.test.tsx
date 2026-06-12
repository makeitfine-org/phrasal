import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WarmVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WarmVerbPage — "to" section definitions', () => {
  it('renders definition for beginning to like something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To begin to like someone or something after initial hesitation or doubt \(often warm up to\)\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming interested in an idea', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become interested in or enthusiastic about an idea or topic\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To begin to like someone or something after initial hesitation or doubt \(often warm up to\)\./i),
      screen.getByText(/To become interested in or enthusiastic about an idea or topic\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To begin to like someone or something after initial hesitation or doubt \(often warm up to\)\./i)).toHaveAttribute(
      'title',
      'To begin to like someone or something after initial hesitation or doubt (often warm up to).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become interested in or enthusiastic about an idea or topic\./i)).toHaveAttribute(
      'title',
      'To become interested in or enthusiastic about an idea or topic.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'warmTo_section_expanded', /To begin to like someone or something after initial hesitation or doubt \(often warm up to\)\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'warmTo', /To begin to like someone or something after initial hesitation or doubt \(often warm up to\)\./i, /I wasn't sure about the Adizes PAEI management model at first, but I'm really warming to it\./i, renderPage, getCard);
