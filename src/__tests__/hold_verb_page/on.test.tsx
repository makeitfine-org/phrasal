import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HoldVerbPage — "on" section definitions', () => {
  it('renders definition for waiting a short time', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To wait for a short time \(often used on the phone\)\./i)).toBeInTheDocument();
  });

  it('renders definition for surviving a difficult situation', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To survive in a difficult or dangerous situation\./i)).toBeInTheDocument();
  });

  it('renders definition for gripping tightly', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To grip something tightly\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To wait for a short time \(often used on the phone\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To wait for a short time \(often used on the phone\)\./i)).toHaveAttribute(
      'title',
      'To wait for a short time (often used on the phone).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'holdOn_section_expanded', /To wait for a short time \(often used on the phone\)\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'holdOn', /To wait for a short time \(often used on the phone\)\./i, /Could you hold on a minute while I check the project schedule\?/i, renderPage, getCard);
