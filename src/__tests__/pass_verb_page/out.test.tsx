import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "out" section definitions', () => {
  it('renders definition for distributing something to a group', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to a group of people/i)).toBeInTheDocument();
  });

  it('renders definition for losing consciousness', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To lose consciousness or faint/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to a group of people/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to a group of people/i)).toHaveAttribute(
      'title',
      'To distribute something to a group of people.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'passOut_section_expanded', /To distribute something to a group of people/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'passOut', /To distribute something to a group of people/i, /Could you pass out these documents before the management meeting starts\?/i, renderPage, getCard);
