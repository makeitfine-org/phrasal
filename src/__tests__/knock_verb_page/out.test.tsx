import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "out" section definitions', () => {
  it('renders definition for hitting someone unconscious', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To hit someone so hard they become unconscious\./i)).toBeInTheDocument();
  });

  it('renders definition for removing from a competition', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove a person or team from a competition\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping a system', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop a system from working\./i)).toBeInTheDocument();
  });

  it('renders definition for creating at high speed', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To create something at high speed\./i)).toBeInTheDocument();
  });

  it('renders definition for greatly impressing someone', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To greatly impress someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To hit someone so hard they become unconscious\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To hit someone so hard they become unconscious\./i)).toHaveAttribute(
      'title',
      'To hit someone so hard they become unconscious.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'knockOut_section_expanded', /To hit someone so hard they become unconscious\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'knockOut', /To hit someone so hard they become unconscious\./i, /The boxer knocked his opponent out in the first round\./i, renderPage, getCard);
