import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "out" section definitions', () => {
  it('renders definition for having an argument and stopping being friends', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To have an argument and stop being friends or colleagues\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming detached and dropping', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To become detached and drop \(usually hair or teeth\)\./i)).toBeInTheDocument();
  });

  it('renders definition for leaving a military formation', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave a formation \(military\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To have an argument and stop being friends or colleagues\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To have an argument and stop being friends or colleagues\./i)).toHaveAttribute(
      'title',
      'To have an argument and stop being friends or colleagues.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'fallOut_section_expanded', /To have an argument and stop being friends or colleagues\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'fallOut', /To have an argument and stop being friends or colleagues\./i, /The two founders fell out over the future direction of the company\./i, renderPage, getCard);
