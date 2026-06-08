import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BackVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BackVerbPage — "over" section definitions', () => {
  it('renders definition for reversing over something', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To drive a vehicle backwards over something or someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To drive a vehicle backwards over something or someone/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To drive a vehicle backwards over something or someone/i)).toHaveAttribute(
      'title',
      'To drive a vehicle backwards over something or someone.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'backOver_section_expanded', /To drive a vehicle backwards over something or someone/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'backOver', /To drive a vehicle backwards over something or someone/i, /I accidentally backed over my laptop bag/i, renderPage, getCard);
