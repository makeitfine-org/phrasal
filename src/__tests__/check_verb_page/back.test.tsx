import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "back" section definitions', () => {
  it('renders definition for returning later to see if something is ready', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return later to see if something has happened or is ready\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return later to see if something has happened or is ready\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return later to see if something has happened or is ready\./i)).toHaveAttribute(
      'title',
      'To return later to see if something has happened or is ready.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'checkBack_section_expanded', /To return later to see if something has happened or is ready\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'checkBack', /To return later to see if something has happened or is ready\./i, /The system is still restarting; please check back in five minutes\./i, renderPage, getCard);
