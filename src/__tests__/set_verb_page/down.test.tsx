import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "down" section definitions', () => {
  it('renders definition for writing something on paper for an official record', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something on paper so there is an official record\./i)).toBeInTheDocument();
  });

  it('renders definition for stating officially how something must be done', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To state officially how something must be done/i)).toBeInTheDocument();
  });

  it('renders definition for stopping a vehicle to let a passenger out', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop a vehicle to let a passenger get out\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something on paper so there is an official record\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something on paper so there is an official record\./i)).toHaveAttribute(
      'title',
      'To write something on paper so there is an official record.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'setDown_section_expanded', /To write something on paper so there is an official record\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'setDown', /To write something on paper so there is an official record\./i, /The new coding standards are set down in the employee handbook\./i, renderPage, getCard);
