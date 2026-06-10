import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HandVerbPage — "off" section definitions', () => {
  it('renders definition for passing responsibility or control to someone else', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To pass the responsibility, control, or execution of a task to someone else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To pass the responsibility, control, or execution of a task to someone else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To pass the responsibility, control, or execution of a task to someone else\./i)).toHaveAttribute(
      'title',
      'To pass the responsibility, control, or execution of a task to someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'handOff_section_expanded', /To pass the responsibility, control, or execution of a task to someone else\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'handOff', /To pass the responsibility, control, or execution of a task to someone else\./i, /I will hand off the server maintenance tasks to the junior Java developers tomorrow\./i, renderPage, getCard);
