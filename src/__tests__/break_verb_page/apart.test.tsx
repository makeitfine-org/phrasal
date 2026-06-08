import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "apart" section definitions', () => {
  it('renders definition for separating into pieces violently', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate or shatter into pieces \(often violently\)/i)).toBeInTheDocument();
  });

  it('renders definition for destroying a relationship or organization', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To destroy a relationship, organization, or group/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate or shatter into pieces \(often violently\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To destroy a relationship, organization, or group/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate or shatter into pieces \(often violently\)/i)).toHaveAttribute(
      'title',
      'To separate or shatter into pieces (often violently).'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'breakApart_section_expanded', /To separate or shatter into pieces \(often violently\)/i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'breakApart', /To separate or shatter into pieces \(often violently\)/i, /The space shuttle broke apart/i, renderPage, getCard);
