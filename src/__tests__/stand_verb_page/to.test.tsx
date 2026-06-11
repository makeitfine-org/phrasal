import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "to" section definitions', () => {
  it('renders definition for taking up defensive positions', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To take up defensive positions/i)).toBeInTheDocument();
  });

  it('renders definition for being likely to gain or lose something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To be in a position where you are likely to gain or lose something\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To take up defensive positions/i)).toHaveClass('truncate');
    expect(screen.getByText(/To be in a position where you are likely to gain or lose something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To take up defensive positions/i)).toHaveAttribute(
      'title',
      'To take up defensive positions (military).'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'standTo_section_expanded', /To take up defensive positions/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'standTo', /To take up defensive positions/i, /The soldiers were ordered to stand to\./i, renderPage, getCard);
