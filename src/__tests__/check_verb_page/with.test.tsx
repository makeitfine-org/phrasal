import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "with" section definitions', () => {
  it('renders definition for asking someone for permission before doing something', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To ask someone for permission, advice, or information before doing something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To ask someone for permission, advice, or information before doing something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To ask someone for permission, advice, or information before doing something\./i)).toHaveAttribute(
      'title',
      'To ask someone for permission, advice, or information before doing something.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'checkWith_section_expanded', /To ask someone for permission, advice, or information before doing something\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'checkWith', /To ask someone for permission, advice, or information before doing something\./i, /You need to check with the project manager before changing the database structure\./i, renderPage, getCard);
