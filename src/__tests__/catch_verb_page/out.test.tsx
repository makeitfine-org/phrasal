import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CatchVerbPage — "out" section definitions', () => {
  it('renders definition for discovering a mistake or lie', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discover that someone has made a mistake, lied, or done something wrong\./i)).toBeInTheDocument();
  });

  it('renders definition for putting someone in a difficult situation', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To put someone in a difficult, unexpected, or unprepared situation\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discover that someone has made a mistake, lied, or done something wrong\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discover that someone has made a mistake, lied, or done something wrong\./i)).toHaveAttribute(
      'title',
      'To discover that someone has made a mistake, lied, or done something wrong.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'catchOut_section_expanded', /To discover that someone has made a mistake, lied, or done something wrong\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'catchOut', /To discover that someone has made a mistake, lied, or done something wrong\./i, /The automated testing pipeline caught the developer out/i, renderPage, getCard);
