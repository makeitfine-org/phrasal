import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "back" section definitions', () => {
  it('renders definition for delaying the progress of a project or plan', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To delay the progress of a project or plan\./i)).toBeInTheDocument();
  });

  it('renders definition for costing a large amount of money', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To cost someone a large amount of money/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To delay the progress of a project or plan\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To delay the progress of a project or plan\./i)).toHaveAttribute(
      'title',
      'To delay the progress of a project or plan.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'setBack_section_expanded', /To delay the progress of a project or plan\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'setBack', /To delay the progress of a project or plan\./i, /A critical bug in the database set the project back by three weeks\./i, renderPage, getCard);
