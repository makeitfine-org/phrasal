import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'EatVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('EatVerbPage — "on" section definitions', () => {
  it('renders definition for gradually consuming leftover food', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To gradually consume a large amount of leftover food over an extended period\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To gradually consume a large amount of leftover food over an extended period\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To gradually consume a large amount of leftover food over an extended period\./i)).toHaveAttribute(
      'title',
      'To gradually consume a large amount of leftover food over an extended period.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'eatOn_section_expanded', /To gradually consume a large amount of leftover food over an extended period\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'eatOn', /To gradually consume a large amount of leftover food over an extended period\./i, /We cooked a massive turkey for the holiday and will just eat on it for the rest of the week\./i, renderPage, getCard);
