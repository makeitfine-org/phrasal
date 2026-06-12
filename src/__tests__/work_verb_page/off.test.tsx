import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "off" section definitions', () => {
  it('renders definition for eliminating stress through physical activity', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To eliminate something like stress, anger, or calories through physical activity\./i)).toBeInTheDocument();
  });

  it('renders definition for repaying a debt through labor', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To repay a debt by providing labor or services instead of money\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    const defs = [
      screen.getByText(/To eliminate something like stress, anger, or calories through physical activity\./i),
      screen.getByText(/To repay a debt by providing labor or services instead of money\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To eliminate something like stress, anger, or calories through physical activity\./i)).toHaveAttribute(
      'title',
      'To eliminate something like stress, anger, or calories through physical activity.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To repay a debt by providing labor or services instead of money\./i)).toHaveAttribute(
      'title',
      'To repay a debt by providing labor or services instead of money.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'workOff_section_expanded', /To eliminate something like stress, anger, or calories through physical activity\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'workOff', /To eliminate something like stress, anger, or calories through physical activity\./i, /After a frustrating meeting, I went to the gym to work off my anger\./i, renderPage, getCard);
