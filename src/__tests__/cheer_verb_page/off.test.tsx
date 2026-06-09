import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheerVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheerVerbPage — "off" section definitions', () => {
  it('renders definition for applauding someone as they leave', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To applaud or shout in support of someone as they are leaving a stage, field, or room\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To applaud or shout in support of someone as they are leaving a stage, field, or room\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To applaud or shout in support of someone as they are leaving a stage, field, or room\./i)).toHaveAttribute(
      'title',
      'To applaud or shout in support of someone as they are leaving a stage, field, or room.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'cheerOff_section_expanded', /To applaud or shout in support of someone as they are leaving a stage, field, or room\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'cheerOff', /To applaud or shout in support of someone as they are leaving a stage, field, or room\./i, /After 20 years with the company/i, renderPage, getCard);
