import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "off" section definitions', () => {
  it('renders definition for keeping at a distance', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To keep at a distance, or to keep someone away\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To keep at a distance, or to keep someone away\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To keep at a distance, or to keep someone away\./i)).toHaveAttribute(
      'title',
      'To keep at a distance, or to keep someone away.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'standOff_section_expanded', /To keep at a distance, or to keep someone away\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'standOff', /To keep at a distance, or to keep someone away\./i, /The police managed to stand off the angry crowd\./i, renderPage, getCard);
