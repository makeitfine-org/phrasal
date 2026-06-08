import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BuildVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BuildVerbPage — "in / into" section definitions', () => {
  it('renders definition for including as permanent part', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To include something as a permanent, essential, or integral part/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To include something as a permanent, essential, or integral part/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To include something as a permanent, essential, or integral part/i)).toHaveAttribute(
      'title',
      'To include something as a permanent, essential, or integral part of a system, plan, or structure from the beginning.'
    );
  });
});

describeSectionToggle(LABEL, 'in / into', 'buildIn_section_expanded', /To include something as a permanent, essential, or integral part/i, renderPage);

describeChevronAndColour(LABEL, 'in / into', renderPage);

describeDefaultImageCards(LABEL, 'in / into', 'buildIn', /To include something as a permanent, essential, or integral part/i, /build in some extra time for unexpected delays/i, renderPage, getCard);
