import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "out" section definitions', () => {
  it('renders definition for exercising to improve physical fitness', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To exercise to improve physical fitness\./i)).toBeInTheDocument();
  });

  it('renders definition for solving a problem or calculating an answer', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To solve a problem or calculate an answer\./i)).toBeInTheDocument();
  });

  it('renders definition for happening or developing in a successful way', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To happen or develop in a particular, usually successful, way\./i)).toBeInTheDocument();
  });

  it("renders definition for understanding someone's character", () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To understand someone's character or a confusing situation\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To exercise to improve physical fitness\./i),
      screen.getByText(/To solve a problem or calculate an answer\./i),
      screen.getByText(/To happen or develop in a particular, usually successful, way\./i),
      screen.getByText(/To understand someone's character or a confusing situation\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To exercise to improve physical fitness\./i)).toHaveAttribute(
      'title',
      'To exercise to improve physical fitness.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To solve a problem or calculate an answer\./i)).toHaveAttribute(
      'title',
      'To solve a problem or calculate an answer.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To happen or develop in a particular, usually successful, way\./i)).toHaveAttribute(
      'title',
      'To happen or develop in a particular, usually successful, way.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To understand someone's character or a confusing situation\./i)).toHaveAttribute(
      'title',
      "To understand someone's character or a confusing situation."
    );
  });
});

describeSectionToggle(LABEL, 'out', 'workOut_section_expanded', /To exercise to improve physical fitness\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'workOut', /To exercise to improve physical fitness\./i, /I try to work out at the gym three times a week\./i, renderPage, getCard);
