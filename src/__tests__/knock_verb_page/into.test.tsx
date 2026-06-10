import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "into" section definitions', () => {
  it('renders definition for unexpectedly meeting someone', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To unexpectedly meet someone you know\./i)).toBeInTheDocument();
  });

  it('renders definition for walking into something by accident', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To walk into something by accident\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To unexpectedly meet someone you know\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To unexpectedly meet someone you know\./i)).toHaveAttribute(
      'title',
      'To unexpectedly meet someone you know.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'knockInto_section_expanded', /To unexpectedly meet someone you know\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'knockInto', /To unexpectedly meet someone you know\./i, /I knocked into my old project manager at the tech conference\./i, renderPage, getCard);
