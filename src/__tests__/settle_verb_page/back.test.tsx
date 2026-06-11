import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SettleVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SettleVerbPage — "back" section definitions', () => {
  it('renders definition for relaxing into a comfortable position', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To relax into a comfortable physical position, usually leaning backward\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To relax into a comfortable physical position, usually leaning backward\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To relax into a comfortable physical position, usually leaning backward\./i)).toHaveAttribute(
      'title',
      'To relax into a comfortable physical position, usually leaning backward.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'settleBack_section_expanded', /To relax into a comfortable physical position, usually leaning backward\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'settleBack', /To relax into a comfortable physical position, usually leaning backward\./i, /After a very successful product launch, the CEO settled back in his chair with a smile\./i, renderPage, getCard);
