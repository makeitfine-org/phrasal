import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "together" section definitions', () => {
  it('renders definition for working as a team', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To work as a team to achieve something/i)).toBeInTheDocument();
  });

  it('renders definition for collecting or organizing information', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To collect or organize information\/things/i)).toBeInTheDocument();
  });

  it('renders definition for regaining emotional control', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To regain emotional control/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To work as a team to achieve something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To work as a team to achieve something/i)).toHaveAttribute(
      'title',
      'To work as a team to achieve something.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'pullTogether_section_expanded', /To work as a team to achieve something/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'pullTogether', /To work as a team to achieve something/i, /If we all pull together/i, renderPage, getCard);
