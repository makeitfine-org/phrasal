import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HandVerbPage — "on" section definitions', () => {
  it('renders definition for giving something to the next person in a sequence', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To give something to the next person, often in a sequence/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To give something to the next person, often in a sequence/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To give something to the next person, often in a sequence/i)).toHaveAttribute(
      'title',
      'To give something to the next person, often in a sequence (similar to passing a message or object along).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'handOn_section_expanded', /To give something to the next person, often in a sequence/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'handOn', /To give something to the next person, often in a sequence/i, /Please read this project update and hand it on to the rest of the management team\./i, renderPage, getCard);
