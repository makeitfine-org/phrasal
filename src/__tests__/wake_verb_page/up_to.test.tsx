import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WakeVerbPage — "up to" section definitions', () => {
  it('renders definition for finally realizing a danger', () => {
    renderPage();
    expandSection('up to');
    expect(screen.getByText(/To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up to');
    const def = screen.getByText(/To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up to');
    expect(screen.getByText(/To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice\./i)).toHaveAttribute(
      'title',
      'To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice.'
    );
  });
});

describeSectionToggle(LABEL, 'up to', 'wakeUpTo_section_expanded', /To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice\./i, renderPage);

describeChevronAndColour(LABEL, 'up to', renderPage);

describeDefaultImageCards(LABEL, 'up to', 'wakeUpTo', /To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice\./i, /The company's board needs to wake up to the fact that their competitors are innovating faster\./i, renderPage, getCard);
