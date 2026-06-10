import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "back" section definitions', () => {
  it('renders definition for staying at a safe distance', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To stay at a safe distance, or make someone stay back\./i)).toBeInTheDocument();
  });

  it('renders definition for hiding information', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hide information; to not tell someone everything you know\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping yourself from showing an emotion', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To stop yourself from showing an emotion\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To stay at a safe distance, or make someone stay back\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To stay at a safe distance, or make someone stay back\./i)).toHaveAttribute(
      'title',
      'To stay at a safe distance, or make someone stay back.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'keepBack_section_expanded', /To stay at a safe distance, or make someone stay back\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'keepBack', /To stay at a safe distance, or make someone stay back\./i, /The police told the crowd to keep back from the accident\./i, renderPage, getCard);
