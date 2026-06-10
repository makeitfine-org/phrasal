import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HoldVerbPage — "out" section definitions', () => {
  it('renders definition for continuing to defend yourself', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To continue to defend yourself or survive in a difficult situation\./i)).toBeInTheDocument();
  });

  it('renders definition for offering a possibility or hope', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To offer a possibility, chance, or hope\./i)).toBeInTheDocument();
  });

  it('renders definition for extending a body part', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extend a part of your body \(like a hand\) or an object\./i)).toBeInTheDocument();
  });

  it('renders definition for holding out for something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To wait and refuse to accept anything less than what you want/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To continue to defend yourself or survive in a difficult situation\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To continue to defend yourself or survive in a difficult situation\./i)).toHaveAttribute(
      'title',
      'To continue to defend yourself or survive in a difficult situation.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'holdOut_section_expanded', /To continue to defend yourself or survive in a difficult situation\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'holdOut', /To continue to defend yourself or survive in a difficult situation\./i, /The team held out against the pressure from the clients and delivered high-quality work\./i, renderPage, getCard);
