import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "against" section definitions', () => {
  it('renders definition for opposing an idea in writing', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To write essays, articles, or books opposing a specific idea, policy, or person\./i)).toBeInTheDocument();
  });

  it('renders definition for deducting an expense', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To deduct an expense from a specific account or budget \(finance\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('against');
    const defs = [
      screen.getByText(/To write essays, articles, or books opposing a specific idea, policy, or person\./i),
      screen.getByText(/To deduct an expense from a specific account or budget \(finance\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To write essays, articles, or books opposing a specific idea, policy, or person\./i)).toHaveAttribute(
      'title',
      'To write essays, articles, or books opposing a specific idea, policy, or person.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To deduct an expense from a specific account or budget \(finance\)\./i)).toHaveAttribute(
      'title',
      'To deduct an expense from a specific account or budget (finance).'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'writeAgainst_section_expanded', /To write essays, articles, or books opposing a specific idea, policy, or person\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'writeAgainst', /To write essays, articles, or books opposing a specific idea, policy, or person\./i, /He spent his later years writing against the dangers of censorship\./i, renderPage, getCard);
