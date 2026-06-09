import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "into" section definitions', () => {
  it('renders definition for calling into question', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To call into question means to make people doubt something/i)).toBeInTheDocument();
  });

  it('renders definition for summoning into a room', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To summon someone into a room\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To call into question means to make people doubt something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To call into question means to make people doubt something/i)).toHaveAttribute(
      'title',
      'To call into question means to make people doubt something (idiom).'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'callInto_section_expanded', /To call into question means to make people doubt something/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'callInto', /To call into question means to make people doubt something/i, /called into question the software's reliability/i, renderPage, getCard);
