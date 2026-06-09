import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FillVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FillVerbPage — "in" section definitions', () => {
  it('renders definition for completing a form or document', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To complete a form or document by writing required information\./i)).toBeInTheDocument();
  });

  it('renders definition for providing missing information', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To provide someone with missing information/i)).toBeInTheDocument();
  });

  it('renders definition for temporarily doing someone else\'s job', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To temporarily do someone else's job because they are absent/i)).toBeInTheDocument();
  });

  it('renders definition for closing a hole or empty space', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To close a hole or empty space by putting a substance into it\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To complete a form or document by writing required information\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To complete a form or document by writing required information\./i)).toHaveAttribute(
      'title',
      'To complete a form or document by writing required information.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'fillIn_section_expanded', /To complete a form or document by writing required information\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'fillIn', /To complete a form or document by writing required information\./i, /Please fill in this application form and return it to the HR department\./i, renderPage, getCard);
