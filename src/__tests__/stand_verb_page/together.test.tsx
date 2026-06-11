import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "together" section definitions', () => {
  it('renders definition for remaining united', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain united and support each other\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain united and support each other\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain united and support each other\./i)).toHaveAttribute(
      'title',
      'To remain united and support each other.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'standTogether_section_expanded', /To remain united and support each other\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'standTogether', /To remain united and support each other\./i, /The team must stand together during this difficult transition period\./i, renderPage, getCard);
