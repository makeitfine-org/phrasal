import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "off" section definitions', () => {
  it('renders definition for cancelling a bad debt', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cancel a bad debt or accept a financial loss\./i)).toBeInTheDocument();
  });

  it('renders definition for dismissing someone as a failure', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To decide that someone or something is useless, unimportant, or a failure\./i)).toBeInTheDocument();
  });

  it('renders definition for damaging a vehicle', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To damage a vehicle so badly that it cannot be repaired \(British\/Commonwealth\)\./i)).toBeInTheDocument();
  });

  it('renders definition for deducting an expense', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To deduct an expense to reduce taxable income\./i)).toBeInTheDocument();
  });

  it('renders definition for sending a letter requesting something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To send a letter requesting something \(often write off for\)\./i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    const defs = [
      screen.getByText(/To cancel a bad debt or accept a financial loss\./i),
      screen.getByText(/To decide that someone or something is useless, unimportant, or a failure\./i),
      screen.getByText(/To damage a vehicle so badly that it cannot be repaired \(British\/Commonwealth\)\./i),
      screen.getByText(/To deduct an expense to reduce taxable income\./i),
      screen.getByText(/To send a letter requesting something \(often write off for\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cancel a bad debt or accept a financial loss\./i)).toHaveAttribute(
      'title',
      'To cancel a bad debt or accept a financial loss.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'writeOff_section_expanded', /To cancel a bad debt or accept a financial loss\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'writeOff', /To cancel a bad debt or accept a financial loss\./i, /The bank decided to write off the unpaid loan\./i, renderPage, getCard);
