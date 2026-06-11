import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "on" section definitions', () => {
  it('renders definition for being powered by something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be powered by something/i)).toBeInTheDocument();
  });

  it('renders definition for continuing for too long', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue for too long/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be powered by something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be powered by something/i)).toHaveAttribute(
      'title',
      'To be powered by something.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'runOn_section_expanded', /To be powered by something/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'runOn', /To be powered by something/i, /The legacy enterprise system still runs on Java/i, renderPage, getCard);
