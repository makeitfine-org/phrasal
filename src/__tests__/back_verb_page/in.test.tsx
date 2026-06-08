import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BackVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BackVerbPage — "in" section definitions', () => {
  it('renders definition for reversing into a parking space', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To drive a vehicle backward into a parking space/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To drive a vehicle backward into a parking space/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To drive a vehicle backward into a parking space/i)).toHaveAttribute(
      'title',
      'To drive a vehicle backward into a parking space.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'backIn_section_expanded', /To drive a vehicle backward into a parking space/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'backIn', /To drive a vehicle backward into a parking space/i, /It is much safer to back in to this parking spot/i, renderPage, getCard);
