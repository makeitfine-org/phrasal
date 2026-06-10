import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "down" section definitions', () => {
  it('renders definition for destroying a building', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To destroy a building completely\./i)).toBeInTheDocument();
  });

  it('renders definition for reducing cost', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the cost of an item\./i)).toBeInTheDocument();
  });

  it('renders definition for negotiating a discount', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To successfully negotiate a discount\./i)).toBeInTheDocument();
  });

  it('renders definition for striking someone with a vehicle', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To strike someone with a vehicle so they fall\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To destroy a building completely\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To destroy a building completely\./i)).toHaveAttribute(
      'title',
      'To destroy a building completely.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'knockDown_section_expanded', /To destroy a building completely\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'knockDown', /To destroy a building completely\./i, /They knocked down the old office to build a new one\./i, renderPage, getCard);
