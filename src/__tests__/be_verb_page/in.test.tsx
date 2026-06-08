import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "in" section definitions', () => {
  it('renders definition for being at home or work', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be at home or in the office\./i)).toBeInTheDocument();
  });

  it('renders definition for being submitted', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be submitted\./i)).toBeInTheDocument();
  });

  it('renders definition for being fashionable', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be fashionable or popular\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be at home or in the office\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be submitted\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be fashionable or popular\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be at home or in the office\./i)).toHaveAttribute(
      'title',
      'To be at home or in the office.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'beIn_section_expanded', /To be at home or in the office\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'beIn', /To be at home or in the office\./i, /The CEO will be in at 9:00 AM/i, renderPage, getCard);
