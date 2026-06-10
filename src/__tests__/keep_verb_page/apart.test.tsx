import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "apart" section definitions', () => {
  it('renders definition for preventing people from coming together', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To prevent people, animals, or things from coming together\./i)).toBeInTheDocument();
  });

  it('renders definition for staying away from each other', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To stay away from each other\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To prevent people, animals, or things from coming together\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To prevent people, animals, or things from coming together\./i)).toHaveAttribute(
      'title',
      'To prevent people, animals, or things from coming together.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'keepApart_section_expanded', /To prevent people, animals, or things from coming together\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'keepApart', /To prevent people, animals, or things from coming together\./i, /The two dogs were fighting, so we had to keep them apart\./i, renderPage, getCard);
