import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LayVerbPage — "to" section definitions', () => {
  it('renders definition for bringing a ship to a standstill', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To bring a ship to a standstill while facing the wind\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To bring a ship to a standstill while facing the wind\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To bring a ship to a standstill while facing the wind\./i)).toHaveAttribute(
      'title',
      '(Nautical) To bring a ship to a standstill while facing the wind.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'layTo_section_expanded', /To bring a ship to a standstill while facing the wind\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'layTo', /To bring a ship to a standstill while facing the wind\./i, /The captain decided to lay to until the storm passed\./i, renderPage, getCard);
