import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "in" section definitions', () => {
  it('renders definition for hitting a nail into a surface', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hit a nail or object so it goes into a surface\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hit a nail or object so it goes into a surface\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hit a nail or object so it goes into a surface\./i)).toHaveAttribute(
      'title',
      'To hit a nail or object so it goes into a surface.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'knockIn_section_expanded', /To hit a nail or object so it goes into a surface\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'knockIn', /To hit a nail or object so it goes into a surface\./i, /He knocked the nail in with a hammer\./i, renderPage, getCard);
