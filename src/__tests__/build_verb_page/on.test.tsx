import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BuildVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BuildVerbPage — "on" section definitions', () => {
  it('renders definition for using past success as foundation', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To use a past achievement, existing idea, or success as a foundation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To use a past achievement, existing idea, or success as a foundation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To use a past achievement, existing idea, or success as a foundation/i)).toHaveAttribute(
      'title',
      'To use a past achievement, existing idea, or success as a foundation for further progress and development.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'buildOn_section_expanded', /To use a past achievement, existing idea, or success as a foundation/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'buildOn', /To use a past achievement, existing idea, or success as a foundation/i, /build on the momentum of last quarter's sales/i, renderPage, getCard);
