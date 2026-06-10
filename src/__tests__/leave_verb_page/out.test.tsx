import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LeaveVerbPage — "out" section definitions', () => {
  it('renders definition for not including someone or something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not include someone or something/i)).toBeInTheDocument();
  });

  it('renders definition for making a person feel excluded', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To make a person feel excluded from a group or activity/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not include someone or something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not include someone or something/i)).toHaveAttribute(
      'title',
      'To not include someone or something.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'leaveOut_section_expanded', /To not include someone or something/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'leaveOut', /To not include someone or something/i, /You can leave out the last exercise; it is optional\./i, renderPage, getCard);
