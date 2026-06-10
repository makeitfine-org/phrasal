import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LayVerbPage — "on" section definitions', () => {
  it('renders definition for providing food or entertainment', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To provide or supply something, especially food, entertainment, or transport\./i)).toBeInTheDocument();
  });

  it('renders definition for applying thickly or exaggerating', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To apply something very thickly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To provide or supply something, especially food, entertainment, or transport\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To provide or supply something, especially food, entertainment, or transport\./i)).toHaveAttribute(
      'title',
      'To provide or supply something, especially food, entertainment, or transport.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'layOn_section_expanded', /To provide or supply something, especially food, entertainment, or transport\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'layOn', /To provide or supply something, especially food, entertainment, or transport\./i, /The company laid on a massive buffet for the leadership conference\./i, renderPage, getCard);
