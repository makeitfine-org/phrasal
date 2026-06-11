import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "apart" section definitions', () => {
  it('renders definition for being separate or isolated from others', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be separate or isolated from others\./i)).toBeInTheDocument();
  });

  it('renders definition for being noticeably different or better', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be noticeably different or better than others\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be separate or isolated from others\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be noticeably different or better than others\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To be separate or isolated from others\./i)).toHaveAttribute(
      'title',
      'To be separate or isolated from others.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'standApart_section_expanded', /To be separate or isolated from others\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'standApart', /To be separate or isolated from others\./i, /The two servers stand apart in the data center for security reasons\./i, renderPage, getCard);
