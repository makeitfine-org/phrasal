import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'EatVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('EatVerbPage — "into" section definitions', () => {
  it('renders definition for using up a portion of a valuable reserve', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To use up a portion of a valuable reserve, especially money or time\./i)).toBeInTheDocument();
  });

  it('renders definition for gradually damaging through corrosion', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To gradually damage or destroy a surface through chemical action or corrosion\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To use up a portion of a valuable reserve, especially money or time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To use up a portion of a valuable reserve, especially money or time\./i)).toHaveAttribute(
      'title',
      'To use up a portion of a valuable reserve, especially money or time.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'eatInto_section_expanded', /To use up a portion of a valuable reserve, especially money or time\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'eatInto', /To use up a portion of a valuable reserve, especially money or time\./i, /The unexpected plumbing repairs really ate into our vacation savings\./i, renderPage, getCard);
