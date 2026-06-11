import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StickVerbPage — "together" section definitions', () => {
  it('renders definition for supporting each other as a group', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To support each other as a group, especially in hard times\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To support each other as a group, especially in hard times\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To support each other as a group, especially in hard times\./i)).toHaveAttribute(
      'title',
      'To support each other as a group, especially in hard times.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'stickTogether_section_expanded', /To support each other as a group, especially in hard times\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'stickTogether', /To support each other as a group, especially in hard times\./i, /A successful development team sticks together during a stressful product release\./i, renderPage, getCard);
