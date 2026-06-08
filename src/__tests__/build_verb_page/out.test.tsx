import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BuildVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BuildVerbPage — "out" section definitions', () => {
  it('renders definition for developing to full potential', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To develop, expand, or complete a system, space, or business/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To develop, expand, or complete a system, space, or business/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To develop, expand, or complete a system, space, or business/i)).toHaveAttribute(
      'title',
      'To develop, expand, or complete a system, space, or business so that it reaches its full potential or size.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'buildOut_section_expanded', /To develop, expand, or complete a system, space, or business/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'buildOut', /To develop, expand, or complete a system, space, or business/i, /received funding to build out its sales and marketing/i, renderPage, getCard);
