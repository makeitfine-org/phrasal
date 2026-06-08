import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "in" section definitions', () => {
  it('renders definition for involving an expert in a project', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To involve someone new in a project or situation \(often an expert\)/i)).toBeInTheDocument();
  });

  it('renders definition for earning money', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To earn or produce money/i)).toBeInTheDocument();
  });

  it('renders definition for introducing a new law or system', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To introduce a new law, rule, or system/i)).toBeInTheDocument();
  });

  it('renders definition for taking someone to a police station', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To take someone to a police station for questioning or arrest/i)).toBeInTheDocument();
  });

  it('renders definition for announcing a verdict in court', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/\(Legal\) To yield or announce a verdict in court/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To involve someone new in a project or situation \(often an expert\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To earn or produce money/i)).toHaveClass('truncate');
    expect(screen.getByText(/To introduce a new law, rule, or system/i)).toHaveClass('truncate');
    expect(screen.getByText(/To take someone to a police station for questioning or arrest/i)).toHaveClass('truncate');
    expect(screen.getByText(/\(Legal\) To yield or announce a verdict in court/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To involve someone new in a project or situation \(often an expert\)/i)).toHaveAttribute(
      'title',
      'To involve someone new in a project or situation (often an expert).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'bringIn_section_expanded', /To involve someone new in a project or situation \(often an expert\)/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'bringIn', /To involve someone new in a project or situation \(often an expert\)/i, /We had to bring in a senior DevOps consultant/i, renderPage, getCard);
