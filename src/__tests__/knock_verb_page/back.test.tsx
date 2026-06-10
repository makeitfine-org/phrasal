import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "back" section definitions', () => {
  it('renders definition for rejecting an offer', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reject an offer or application\./i)).toBeInTheDocument();
  });

  it('renders definition for costing money', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To cost someone a large amount of money\./i)).toBeInTheDocument();
  });

  it('renders definition for consuming a drink quickly', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To consume an alcoholic drink quickly\./i)).toBeInTheDocument();
  });

  it('renders definition for surprising or shocking', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To surprise or shock someone; to leave someone amazed or stunned\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reject an offer or application\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reject an offer or application\./i)).toHaveAttribute(
      'title',
      'To reject an offer or application.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'knockBack_section_expanded', /To reject an offer or application\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'knockBack', /To reject an offer or application\./i, /The investors knocked back our business proposal\./i, renderPage, getCard);
