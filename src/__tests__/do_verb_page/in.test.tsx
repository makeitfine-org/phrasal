import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "in" section definitions', () => {
  it('renders definition for making someone extremely tired', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make someone extremely tired \(exhaust\)\./i)).toBeInTheDocument();
  });

  it('renders definition for injuring a body part', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To injure a body part\./i)).toBeInTheDocument();
  });

  it('renders definition for killing or murdering', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To kill or murder \(informal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make someone extremely tired \(exhaust\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make someone extremely tired \(exhaust\)\./i)).toHaveAttribute(
      'title',
      'To make someone extremely tired (exhaust).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'doIn_section_expanded', /To make someone extremely tired \(exhaust\)\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'doIn', /To make someone extremely tired \(exhaust\)\./i, /That 10-kilometer run really did me in/i, renderPage, getCard);
