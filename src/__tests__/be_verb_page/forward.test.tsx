import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "forward" section definitions', () => {
  it('renders definition for acting too confidently', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To act presumptuously or too confidently\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To act presumptuously or too confidently\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To act presumptuously or too confidently\./i)).toHaveAttribute(
      'title',
      'To act presumptuously or too confidently.'
    );
  });
});

describeSectionToggle(LABEL, 'forward', 'beForward_section_expanded', /To act presumptuously or too confidently\./i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'beForward', /To act presumptuously or too confidently\./i, /I do not want to be forward/i, renderPage, getCard);
