import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "apart" section definitions', () => {
  it('renders definition for failing completely', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To fail completely \(systems, plans, or organizations\)\./i)).toBeInTheDocument();
  });

  it('renders definition for emotional breakdown', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To experience a serious emotional or mental breakdown\./i)).toBeInTheDocument();
  });

  it('renders definition for breaking into pieces', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To break into pieces because of poor condition\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To fail completely \(systems, plans, or organizations\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To fail completely \(systems, plans, or organizations\)\./i)).toHaveAttribute(
      'title',
      'To fail completely (systems, plans, or organizations).'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'fallApart_section_expanded', /To fail completely \(systems, plans, or organizations\)\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'fallApart', /To fail completely \(systems, plans, or organizations\)\./i, /The software project fell apart due to poor management\./i, renderPage, getCard);
