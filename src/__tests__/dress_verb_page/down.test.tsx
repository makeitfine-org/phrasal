import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DressVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DressVerbPage — "down" section definitions', () => {
  it('renders definition for wearing casual clothes', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wear clothes that are more informal or casual than what you usually wear\./i)).toBeInTheDocument();
  });

  it('renders definition for criticizing or scolding someone', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To strongly criticize or scold someone because they did something wrong\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wear clothes that are more informal or casual than what you usually wear\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wear clothes that are more informal or casual than what you usually wear\./i)).toHaveAttribute(
      'title',
      'To wear clothes that are more informal or casual than what you usually wear.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'dressDown_section_expanded', /To wear clothes that are more informal or casual than what you usually wear\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'dressDown', /To wear clothes that are more informal or casual than what you usually wear\./i, /allows us to dress down on Fridays/i, renderPage, getCard);
