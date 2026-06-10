import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "over" section definitions', () => {
  it('renders definition for hitting something so it falls', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To hit something so it falls on its side\./i)).toBeInTheDocument();
  });

  it('renders definition for stealing from a business', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To steal from a business \(informal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To hit something so it falls on its side\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To hit something so it falls on its side\./i)).toHaveAttribute(
      'title',
      'To hit something so it falls on its side.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'knockOver_section_expanded', /To hit something so it falls on its side\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'knockOver', /To hit something so it falls on its side\./i, /I accidentally knocked over my coffee onto the keyboard\./i, renderPage, getCard);
