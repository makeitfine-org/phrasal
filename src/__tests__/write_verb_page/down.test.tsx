import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "down" section definitions', () => {
  it('renders definition for recording something on paper', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To record something on paper so it is not forgotten\./i)).toBeInTheDocument();
  });

  it('renders definition for reducing asset value', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the estimated or nominal value of an asset \(finance\)\./i)).toBeInTheDocument();
  });

  it('renders definition for writing condescendingly', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write in a condescendingly simple way \(usually write down to\)\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To record something on paper so it is not forgotten\./i),
      screen.getByText(/To reduce the estimated or nominal value of an asset \(finance\)\./i),
      screen.getByText(/To write in a condescendingly simple way \(usually write down to\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To record something on paper so it is not forgotten\./i)).toHaveAttribute(
      'title',
      'To record something on paper so it is not forgotten.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the estimated or nominal value of an asset \(finance\)\./i)).toHaveAttribute(
      'title',
      'To reduce the estimated or nominal value of an asset (finance).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write in a condescendingly simple way \(usually write down to\)\./i)).toHaveAttribute(
      'title',
      'To write in a condescendingly simple way (usually write down to).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'writeDown_section_expanded', /To record something on paper so it is not forgotten\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'writeDown', /To record something on paper so it is not forgotten\./i, /Please write down my phone number before you lose it\./i, renderPage, getCard);
