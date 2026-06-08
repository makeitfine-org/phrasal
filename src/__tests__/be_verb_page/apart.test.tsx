import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "apart" section definitions', () => {
  it('renders definition for being separated', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be separated physically or emotionally\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be separated physically or emotionally\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be separated physically or emotionally\./i)).toHaveAttribute(
      'title',
      'To be separated physically or emotionally.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'beApart_section_expanded', /To be separated physically or emotionally\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'beApart', /To be separated physically or emotionally\./i, /The two microservices must be apart/i, renderPage, getCard);
