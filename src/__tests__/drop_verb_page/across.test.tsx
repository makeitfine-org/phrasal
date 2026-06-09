import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "across" section definitions', () => {
  it('renders definition for happening to find or meet', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To happen to find or meet/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To happen to find or meet/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To happen to find or meet/i)).toHaveAttribute(
      'title',
      'To happen to find or meet (very rare / old-fashioned; "come across" is almost always preferred today).'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'dropAcross_section_expanded', /To happen to find or meet/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'dropAcross', /To happen to find or meet/i, /I dropped across an old project file/i, renderPage, getCard);
