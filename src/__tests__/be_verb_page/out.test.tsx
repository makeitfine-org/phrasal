import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "out" section definitions', () => {
  it('renders definition for being absent', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be absent from home or the office\./i)).toBeInTheDocument();
  });

  it('renders definition for being published', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be published or released\./i)).toBeInTheDocument();
  });

  it('renders definition for a secret being revealed', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be revealed \(for a secret\)\./i)).toBeInTheDocument();
  });

  it('renders definition for being unacceptable', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be impossible or unacceptable\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be absent from home or the office\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be published or released\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be revealed \(for a secret\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be impossible or unacceptable\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be absent from home or the office\./i)).toHaveAttribute(
      'title',
      'To be absent from home or the office.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'beOut_section_expanded', /To be absent from home or the office\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'beOut', /To be absent from home or the office\./i, /The manager is out until next week/i, renderPage, getCard);
