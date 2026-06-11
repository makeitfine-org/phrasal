import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SitVerbPage — "with" section definitions', () => {
  it('renders definition for being acceptable or causing a feeling', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To be acceptable to someone, or to cause a certain feeling\./i)).toBeInTheDocument();
  });

  it('renders definition for spending time with someone upset or sick', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To spend time with someone who is upset or sick to give them support\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To be acceptable to someone, or to cause a certain feeling\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To spend time with someone who is upset or sick to give them support\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To be acceptable to someone, or to cause a certain feeling\./i)).toHaveAttribute(
      'title',
      'To be acceptable to someone, or to cause a certain feeling.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'sitWith_section_expanded', /To be acceptable to someone, or to cause a certain feeling\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'sitWith', /To be acceptable to someone, or to cause a certain feeling\./i, /The new remote work policy does not sit well with the development team\./i, renderPage, getCard);
