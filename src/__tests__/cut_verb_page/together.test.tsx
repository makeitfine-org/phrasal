import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "together" section definitions', () => {
  it('renders definition for editing film or audio', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To edit film or audio by joining distinct pieces/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To edit film or audio by joining distinct pieces/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To edit film or audio by joining distinct pieces/i)).toHaveAttribute(
      'title',
      'To edit film or audio by joining distinct pieces.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'cutTogether_section_expanded', /To edit film or audio by joining distinct pieces/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'cutTogether', /To edit film or audio by joining distinct pieces/i, /The marketing team cut together/i, renderPage, getCard);
