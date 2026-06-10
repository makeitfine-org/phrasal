import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "together" section definitions', () => {
  it('renders definition for creating something quickly', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To create something quickly using whatever is available\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To create something quickly using whatever is available\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To create something quickly using whatever is available\./i)).toHaveAttribute(
      'title',
      'To create something quickly using whatever is available.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'knockTogether_section_expanded', /To create something quickly using whatever is available\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'knockTogether', /To create something quickly using whatever is available\./i, /I knocked together a quick test environment for the new app\./i, renderPage, getCard);
