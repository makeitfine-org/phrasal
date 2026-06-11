import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThrowVerbPage — "on" section definitions', () => {
  it('renders definition for putting on clothing quickly', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on quickly or hastily/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on quickly or hastily/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on quickly or hastily/i)).toHaveAttribute(
      'title',
      'To put on quickly or hastily (clothing).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'throwOn_section_expanded', /To put on quickly or hastily/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'throwOn', /To put on quickly or hastily/i, /I just threw on a pair of jeans and ran to the grocery store\./i, renderPage, getCard);
