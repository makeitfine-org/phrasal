import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "in" section definitions', () => {
  it('renders definition for interrupting a conversation', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interrupt a conversation/i)).toBeInTheDocument();
  });

  it('renders definition for moving in front of another vehicle', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To move suddenly in front of another vehicle or person/i)).toBeInTheDocument();
  });

  it('renders definition for including in a deal', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include someone in a deal or share of profits/i)).toBeInTheDocument();
  });

  it('renders definition for machines starting automatically', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To automatically start operating/i)).toBeInTheDocument();
  });

  it('renders definition for interrupting a dancing couple', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interrupt a dancing couple to take over as a partner/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interrupt a conversation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To move suddenly in front of another vehicle or person/i)).toHaveClass('truncate');
    expect(screen.getByText(/To include someone in a deal or share of profits/i)).toHaveClass('truncate');
    expect(screen.getByText(/To automatically start operating/i)).toHaveClass('truncate');
    expect(screen.getByText(/To interrupt a dancing couple to take over as a partner/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interrupt a conversation/i)).toHaveAttribute(
      'title',
      'To interrupt a conversation.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'cutIn_section_expanded', /To interrupt a conversation/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'cutIn', /To interrupt a conversation/i, /Do you mind if I cut in/i, renderPage, getCard);
