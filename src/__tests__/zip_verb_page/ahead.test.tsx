import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "ahead" section definitions', () => {
  it('renders definition for advancing quickly', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To advance quickly, often leaving others behind or moving to the front of a line or progression\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    const def = screen.getByText(/To advance quickly, often leaving others behind or moving to the front of a line or progression\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To advance quickly, often leaving others behind or moving to the front of a line or progression\./i)).toHaveAttribute(
      'title',
      'To advance quickly, often leaving others behind or moving to the front of a line or progression.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'zipAhead_section_expanded', /To advance quickly, often leaving others behind or moving to the front of a line or progression\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'zipAhead', /To advance quickly, often leaving others behind or moving to the front of a line or progression\./i, /He zipped ahead of the rest of the runners in the final lap\./i, renderPage, getCard);
