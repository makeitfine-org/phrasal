import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "after" section definitions', () => {
  it('renders definition for asking for news about someone', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To ask for news about someone, usually concerning their health/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To ask for news about someone, usually concerning their health/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To ask for news about someone, usually concerning their health/i)).toHaveAttribute(
      'title',
      'To ask for news about someone, usually concerning their health or how their life is going.'
    );
  });
});

describeSectionToggle(LABEL, 'after', 'askAfter_section_expanded', /To ask for news about someone, usually concerning their health/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'askAfter', /To ask for news about someone, usually concerning their health/i, /I saw your old manager yesterday, and he asked after you/i, renderPage, getCard);
