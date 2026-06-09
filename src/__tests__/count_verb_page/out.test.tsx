import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CountVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CountVerbPage — "out" section definitions', () => {
  it('renders definition for not including someone in an activity', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not include someone in an activity or plan\./i)).toBeInTheDocument();
  });

  it('renders definition for counting things one by one', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To count things one by one, often when distributing them \(like money\)\./i)).toBeInTheDocument();
  });

  it('renders definition for declaring a fighter defeated in boxing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/\(In boxing\) To declare a fighter defeated/i)).toBeInTheDocument();
  });

  it('first definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not include someone in an activity or plan\./i)).toHaveClass('truncate');
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not include someone in an activity or plan\./i)).toHaveAttribute(
      'title',
      'To not include someone in an activity or plan.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'countOut_section_expanded', /To not include someone in an activity or plan\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'countOut', /To not include someone in an activity or plan\./i, /count me out/i, renderPage, getCard);
