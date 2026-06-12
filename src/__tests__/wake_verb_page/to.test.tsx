import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WakeVerbPage — "to" section definitions', () => {
  it('renders definition for waking to a condition', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To stop sleeping and immediately find a specific condition, sound, or situation greeting you\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming aware (literary)', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become aware of a fact or responsibility \(literary\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To stop sleeping and immediately find a specific condition, sound, or situation greeting you\./i),
      screen.getByText(/To become aware of a fact or responsibility \(literary\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To stop sleeping and immediately find a specific condition, sound, or situation greeting you\./i)).toHaveAttribute(
      'title',
      'To stop sleeping and immediately find a specific condition, sound, or situation greeting you.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become aware of a fact or responsibility \(literary\)\./i)).toHaveAttribute(
      'title',
      'To become aware of a fact or responsibility (literary).'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'wakeTo_section_expanded', /To stop sleeping and immediately find a specific condition, sound, or situation greeting you\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'wakeTo', /To stop sleeping and immediately find a specific condition, sound, or situation greeting you\./i, /We woke to the sound of birds singing outside the window\./i, renderPage, getCard);
