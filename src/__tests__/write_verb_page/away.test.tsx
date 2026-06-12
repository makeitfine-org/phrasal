import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "away" section definitions', () => {
  it('renders definition for sending a letter requesting something', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To send a letter requesting something \(synonymous with write off for\)\./i)).toBeInTheDocument();
  });

  it('renders definition for writing continuously', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To write continuously and diligently\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    const defs = [
      screen.getByText(/To send a letter requesting something \(synonymous with write off for\)\./i),
      screen.getByText(/To write continuously and diligently\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To send a letter requesting something \(synonymous with write off for\)\./i)).toHaveAttribute(
      'title',
      'To send a letter requesting something (synonymous with write off for).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To write continuously and diligently\./i)).toHaveAttribute(
      'title',
      'To write continuously and diligently.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'writeAway_section_expanded', /To send a letter requesting something \(synonymous with write off for\)\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'writeAway', /To send a letter requesting something \(synonymous with write off for\)\./i, /When I was a kid, I used to write away for x-ray glasses I saw in comic books\./i, renderPage, getCard);
